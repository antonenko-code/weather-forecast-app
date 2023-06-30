import { ErrorsMessages } from './ErrorsMessages';

export interface Errors {
  onGetFavorites: ErrorsMessages | null,
  onGetCurrentLocation: ErrorsMessages | null,
  onLoading: ErrorsMessages | null,
}
