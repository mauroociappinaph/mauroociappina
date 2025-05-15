import { User , AuthState } from "./interface/auth/authStore.interface";
import { Potulation , PotulationState , PotulationStatus , STATUS_LABELS , STATUS_COLORS } from "./interface/postulations/application";
import { SimpleSelectProps } from "./interface/ui/simpleSelect.interface";
import { ModalProps } from "./interface/modal/modal.interface";



// Exportar tipos
export type { User , AuthState , Potulation , PotulationState , PotulationStatus , SimpleSelectProps , ModalProps };

// Exportar valores
export { STATUS_LABELS, STATUS_COLORS };
