# Covid19 Dashboard - Architecture Overview

A Single Page Application (SPA) built with Angular that provides interactive visualization of COVID-19 data. 

## Architecture

This project implements Clean Architecture principles with a clear separation of concerns:

## Domain Layer
- `CovidDataEntity`: Core data structure with essential COVID-19 statistics (cases, deaths, recovered)
- `ViewType` enum: Defines available visualization modes (chart/table)

## Application Layer
- `GetCovidDataUseCase`: Handles data retrieval operations with country and period parameters
- Centralizes business logic for COVID-19 data processing

## Presentation Layer
### Smart Components
- `DashboardComponent`: Main container managing view state and user interactions
  - Handles view type switching (chart/table)
  - Manages filters and data loading
  - Implements responsive layout

### Presentation Logic
- `DashboardView`: Encapsulates reactive data flow
  - Manages loading states via `BehaviorSubject`
  - Handles data streaming with RxJS operators

### Dumb Components
- `ChartComponent`: Visualizes data in graph format
- `TableComponent`: Displays data in tabular format
- `FiltersComponent`: User input for country and period selection

## Infrastructure Layer
- HTTP services for COVID-19 API integration

## Technical Implementation
- Angular 19.1.8 with standalone components
- Angular Material for UI (MatButtonToggle, MatIcon, MatSpinner)
- RxJS for reactive state management
- TypeScript for type safety

