//src/common/dtos/session-device.dto.ts
export class SessionDeviceDto {
  sessionId!: string;
  deviceType!: string;
  deviceName?: string;
  userAgent!: string;
  ipAddress!: string;
  createdAt!: Date;
  lastActivityAt!: Date;
  isCurrentDevice!: boolean;
}