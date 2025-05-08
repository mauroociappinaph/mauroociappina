import { User , AuthState } from "./interface/auth/authStore.interface";
import { Application , ApplicationState , ApplicationStatus , STATUS_LABELS , STATUS_COLORS } from "./interface/application/application";
import { SimpleSelectProps } from "./interface/ui/simpleSelect.interface";
import { ModalProps } from "./interface/modal/modal.interface";



// Exportar tipos
export type { User , AuthState , Application , ApplicationState , ApplicationStatus , SimpleSelectProps , ModalProps };

// Exportar valores
export { STATUS_LABELS, STATUS_COLORS };
