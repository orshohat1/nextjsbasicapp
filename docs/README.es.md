# Aplicación Básica de Next.js

Una aplicación de Next.js con flujos de trabajo automatizados de GitHub Actions para la gestión de problemas y el despliegue en Azure Kubernetes Service (AKS).

## Resumen del Proyecto

Este repositorio contiene:
- Una aplicación Next.js construida con TypeScript y Tailwind CSS.
- Flujos de trabajo automatizados de GitHub Actions para la gestión de problemas.
- Helm charts para el despliegue en Kubernetes.
- Configuración de Docker para la contenedorización.

## Comenzando

### Requisitos Previos

- Node.js (se recomienda v18 o una versión posterior)
- npm o yarn
- Docker (para contenedorización)
- kubectl y Helm (para despliegue en Kubernetes)

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## Flujos de Trabajo de GitHub Actions

### Verificación de Reproducción de Bugs

**Archivo**: `.github/workflows/bug-reproduction-instructions.yml`

Analiza automáticamente los nuevos problemas etiquetados como 'bug' utilizando IA para determinar si contienen suficiente información de reproducción. Si faltan detalles, el flujo de trabajo publica un comentario útil orientando al reportero.

- **Desencadenante**: Cuando se abren problemas.
- **Filtro**: Solo se ejecuta para problemas con la etiqueta 'bug'.
- **Modelo AI**: mistral-ai/ministral-3b.

### Resumen Semanal de Problemas

**Archivo**: `.github/workflows/weekly-issue-summary.yml`

Crea un resumen semanal de todos los problemas creados en los últimos 7 días.

- **Desencadenante**: Cada lunes a las 09:00 UTC (o manualmente vía workflow_dispatch).
- **Modelo AI**: xai/grok-3-mini.
- **Salida**: Abre un nuevo problema con el contenido resumido.

## Despliegue

### Despliegue AKS con Helm

El proyecto incluye Helm charts en el directorio `testapp/` para el despliegue en Azure Kubernetes Service.

#### Trabajos y su Propósito

**`analyze`**: Realiza pruebas de seguridad estática del código utilizando CodeQL para lenguajes específicos.

**`set-version`**: Establece la versión de la aplicación según el historial de commits.

**`buildImage`**: Construye una imagen Docker de la aplicación y la sube a Azure Container Registry (ACR). Incluye escaneo de vulnerabilidades con Trivy.

**`deploy`**: Despliega la aplicación en el clúster de AKS utilizando Helm charts con validación en seco.

**`post-deployment`**: Ejecuta pruebas posteriores al despliegue en la aplicación desplegada.

**`tag-as-stable`**: Etiqueta la imagen como estable en Azure Container Registry.

#### Variables de Entorno

- `AZURE_CONTAINER_REGISTRY`: Nombre del Azure Container Registry.
- `RESOURCE_GROUP`: Nombre del grupo de recursos de Azure.
- `CLUSTER_NAME`: Nombre del clúster AKS.

#### Secretos Requeridos

- `AZURE_CLIENT_ID`
- `AZURE_CLIENT_SECRET`
- `AZURE_TENANT_ID`

## Estructura del Proyecto

```
├── .github/
│   └── workflows/          # Flujos de trabajo de GitHub Actions
├── app/                    # Directorio de la app Next.js
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Diseño raíz
│   ├── page.tsx           # Página principal
│   └── sql.ts             # Utilidades SQL
├── public/                # Recursos estáticos
├── testapp/               # Helm chart para el despliegue
│   ├── templates/         # Manifiestos de Kubernetes
│   ├── Chart.yaml         # Metadatos del Helm chart
│   └── values.yaml        # Valores predeterminados
├── weekly-issue-summary/  # Configuración del resumen de problemas
├── Dockerfile             # Configuración de construcción de Docker
├── next.config.js         # Configuración de Next.js
├── tailwind.config.ts     # Configuración de Tailwind CSS
└── tsconfig.json          # Configuración de TypeScript
```

## Contribuyendo

Al reportar errores, incluya:
- Pasos para reproducir el problema.
- Comportamiento esperado vs comportamiento actual.
- Detalles del entorno (navegador, sistema operativo, versiones).
- Registros o capturas de pantalla relevantes.

## Licencia

[Agregue aquí la información de su licencia]

## Contacto

Para problemas o preguntas, abra un problema en este repositorio.
