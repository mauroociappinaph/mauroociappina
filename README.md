# Postulate Client

## Reglas de codificación aplicadas

### Estructura de directorios

- **features/**: Agrupación por característica
  - `components/`: Componentes UI específicos de la característica
  - `domain/`: Lógica de negocio y validación
- **shared/**: Componentes y hooks reutilizables
- **interfaces/**: Definiciones de tipos TypeScript organizadas por contexto

### Interfaces TypeScript

- Interfaces en archivos separados con sufijos descriptivos (.interface.ts)
- Organización en subcarpetas por contexto:
  - `ui/`: interfaces de componentes visuales
  - `auth/`: interfaces relacionadas a autenticación
  - `api/`: tipos de respuesta de APIs
  - `form/`: interfaces para formularios
  - `components/`: interfaces de componentes

### Separación de UI y Lógica

- Componentes divididos en:
  - `*.ui.tsx`: Presentación pura
  - `*.container.tsx`: Lógica y estado
  - `*.container.spec.tsx`: Tests unitarios

### Testing

- Tests para componentes contenedores
- Enfoque en comportamiento, no implementación
- Uso de Jest para pruebas unitarias

### Refactorización

- Código DRY (Don't Repeat Yourself)
- Nombres descriptivos para variables y funciones
- Extracción de lógica común en utilidades
- Componentes con responsabilidad única

## Comandos

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar tests
npm test
```
