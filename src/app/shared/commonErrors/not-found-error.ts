import { AppError } from './app-error';
export class NotFoundError extends AppError {}
// legitmate error not un expected error so no need to send this error
// or log this error to server
