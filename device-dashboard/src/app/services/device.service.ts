import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device.model';

interface CreateDeviceResponse {
  message: string;
  equipment: Device;
}

interface DeleteDeviceResponse {
  message: string;
}

type DeviceMutationPayload = Partial<Pick<Device, 'name' | 'type' | 'status' | 'ip' | 'os' | 'lastSeen'>>;

@Injectable({ providedIn: 'root' })

export class DeviceService {
  private devices$ = new BehaviorSubject<Device[]>([]);
  private searchQuery$ = new BehaviorSubject<string>('');
  private statusFilter$ = new BehaviorSubject<string>('tous');
  private isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.loadDevices();
  }

  loadDevices(): void {
    this.isLoading$.next(true);
    this.http.get<Device[]>('http://localhost:3000/equipments').subscribe({
      next: (devices) => {
        this.devices$.next(devices);
        this.isLoading$.next(false);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des équipements', error);
        this.isLoading$.next(false);
      }
    });
  }

  addDevice(device: DeviceMutationPayload): Observable<CreateDeviceResponse> {
    return this.http.post<CreateDeviceResponse>('http://localhost:3000/equipments', device).pipe(
      tap(() => {
        this.loadDevices();
      })
    );
  }

  getDevice(id: string): Observable<Device> {
    return this.http.get<Device>(`http://localhost:3000/equipments/${id}`);
  }

  updateDevice(id: string, device: DeviceMutationPayload): Observable<Device> {
    return this.http.put<Device>(`http://localhost:3000/equipments/${id}`, device).pipe(
      tap(() => {
        this.loadDevices();
      })
    );
  }

  deleteDevice(id: string): Observable<DeleteDeviceResponse> {
    return this.http.delete<DeleteDeviceResponse>(`http://localhost:3000/equipments/${id}`).pipe(
      tap(() => {
        this.loadDevices();
      })
    );
  }

  setSearch(query: string): void { this.searchQuery$.next(query); }
  setFilter(status: string): void { this.statusFilter$.next(status); }
  getLoadingState(): Observable<boolean> { return this.isLoading$.asObservable(); }

  getFilteredDevices(): Observable<Device[]> {
    return combineLatest([this.devices$, this.searchQuery$, this.statusFilter$]).pipe(
      map(([devices, query, status]) => devices.filter(device => {
        const matchSearch = device.name.toLowerCase().includes(query.toLowerCase())
          || device.type.toLowerCase().includes(query.toLowerCase());
        const matchStatus = status === 'tous' || device.status === status;
        return matchSearch && matchStatus;
      }))
    );
  }

  getStats(): Observable<{ total: number, online: number, offline: number, maintenance: number }> {
    return this.devices$.pipe(
      map(devices => ({
        total: devices.length,
        online: devices.filter(d => d.status === 'online').length,
        offline: devices.filter(d => d.status === 'offline').length,
        maintenance: devices.filter(d => d.status === 'maintenance').length,
      }))
    );
  }
}