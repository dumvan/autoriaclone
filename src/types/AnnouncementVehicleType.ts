import {TransmissionTypeEnum} from "../enums/vehicleEnums/transmission.type.enum.js";
import {FuelTypeEnum} from "../enums/vehicleEnums/fuel.type.enum.js";
import {EnvironmentalStandardEnum} from "../enums/vehicleEnums/environmental.standard.enum.js";
import {DriveTypeEnum} from "../enums/vehicleEnums/drive.type.enum.js";
import {PaintConditionEnum} from "../enums/vehicleEnums/paint.condition.enum.js";
import {TechnicalConditionEnum} from "../enums/vehicleEnums/technical.condition.enum.js";
import {VehicleTypeEnum} from "../enums/vehicleEnums/vehicle.type.enum.js";

export type FuelConsumptionDto = {
    city?: number;
    highway?: number;
    combined?: number;
    unit?: string
}

export type VehicleCharacteristics = {
    transmission?: TransmissionTypeEnum;
    fuel_type?: FuelTypeEnum;
    engine_power?: {value: number, unit?: string};
    fuel_consumption?: FuelConsumptionDto;
    engine_capacity?: {value: number, unit?: string};
    environmental_standard?: EnvironmentalStandardEnum;
    drive_type?: DriveTypeEnum;
    door_number?: number;
    color?: string;
    metallic?: boolean;
    seat_number?: number;
    imported_from?: string;
    accident_history?: boolean;
    paint_condition?: PaintConditionEnum;
    technical_condition?: TechnicalConditionEnum;
    service_station_inspection_readiness?: boolean;
}

export type AnnouncementVehicleType = {
    brand: string;
    model: string;
    year: number;
    vehicle_type: VehicleTypeEnum;
    mileage: number;
    characteristics?: VehicleCharacteristics;
}


