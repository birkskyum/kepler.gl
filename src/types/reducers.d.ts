import {Field, Millisecond} from './types';

export type MapState = {
  pitch: number;
  bearing: number;
  latitude: number;
  longitude: number;
  zoom: number;
  dragRotate: boolean;
  width: number;
  height: number;
  minZoom?: number;
  maxZoom?: number;
  maxBounds?: Bounds;
  initialState?: any;
  scale?: number;

  // the following 4 properties assist with split viewports that can optionally have (un)synced viewports and zooms
  /**  Is the application split into 2 maps? */
  isSplit: boolean;
  /**  Are the 2 split maps having synced viewports? */
  isViewportSynced: boolean;
  /**  If split, are the zooms locked to each other or independent? */
  isZoomLocked: boolean;
  /**  An array of either 0 or 2 Viewport objects (index 0 for left map; index 1 for right map) */
  splitMapViewports: Viewport[];
};

export type Bounds = [number, number, number, number];

export type HistogramBin = {
  x0: number | undefined;
  x1: number | undefined;
  count: number;
};

export type RangeFieldDomain = {
  domain: [number, number];
  step: number;
  histogram: HistogramBin[];
  enlargedHistogram: HistogramBin[];
};

export type SelectFieldDomain = {
  domain: [true, false];
};
export type MultiSelectFieldDomain = {
  domain: string[];
};

export type TimeRangeFieldDomain = {
  domain: [number, number];
  step: number;
  histogram: HistogramBin[];
  enlargedHistogram: HistogramBin[];
  mappedValue: (Millisecond | null)[];
  // auto generated based on time domain
  defaultTimeFormat?: string | null;
  // custom ui input
  timeFormat?: string | null;
  // custom ui input
  timezone?: string | null;
};
export type FieldDomain =
  | RangeFieldDomain
  | TimeRangeFieldDomain
  | SelectFieldDomain
  | MultiSelectFieldDomain;

export type LineChart = {
  series: {x: number; y: number}[];
  yDomain: [number, number];
  xDomain: [number, number];
};

type FilterViewType = 'side' | 'enlarged' | 'minified';

export type FilterBase<L extends LineChart> = {
  dataId: string[];
  id: string;
  enabled: boolean;

  freeze: boolean;

  // time range filter specific
  fixedDomain: boolean;
  view: FilterViewType;
  isAnimating: boolean;
  speed: number;
  showTimeDisplay?: boolean;

  // field specific
  name: string[]; // string
  type: string | null;
  fieldIdx: number[]; // [integer]
  domain: any[] | null;
  value: any;
  mappedValue?: number[];

  // plot
  yAxis: Field | null;
  plotType: string;
  lineChart?: L;
  // gpu filter
  gpu: boolean;
  gpuChannel?: number[];
  fieldType?: string;

  // polygon
  layerId?: string[];
};

export type RangeFilter = FilterBase<LineChart> &
  RangeFieldDomain & {
    type: 'range';
    fieldType: 'real' | 'integer';
    value: [number, number];
    fixedDomain: true;
    typeOptions: ['range'];
  };

export type SelectFilter = FilterBase<LineChart> &
  SelectFieldDomain & {
    type: 'select';
    fieldType: 'boolean';
    value: boolean;
  };

export type MultiSelectFilter = FilterBase<LineChart> &
  MultiSelectFieldDomain & {
    type: 'multiSelect';
    fieldType: 'string' | 'date';
    value: string[];
  };

export type TimeRangeFilter = FilterBase<LineChart> &
  TimeRangeFieldDomain & {
    type: 'timeRange';
    fieldType: 'timestamp';
    fixedDomain: true;
    value: [number, number];
    bins?: Object;
    plotType: {
      [key: string]: any;
    };
    animationWindow: string;
  };

export type PolygonFilter = FilterBase<LineChart> & {
  layerId: string[];
  type: 'polygon';
  fixedDomain: true;
  value: Feature;
};

export type Filter =
  | FilterBase<LineChart>
  | RangeFilter
  | TimeRangeFilter
  | SelectFilter
  | MultiSelectFilter
  | PolygonFilter;

export type Feature = {
  id: string;
  properties: any;
  geometry: {
    type: string;
    coordinates: any;
  };
  type?: string;
};
export type FeatureSelectionContext = {
  rightClick: boolean;
  position: {x: number; y: number};
  mapIndex?: number;
};
export type FeatureValue = {
  id: string;
  properties: {
    filterId: string;
  };
  geometry: {
    type: string;
    coordinates: any;
  };
};
export type Editor = {
  mode: string;
  features: Feature[];
  selectedFeature: any;
  selectionContext?: FeatureSelectionContext;
  visible: boolean;
};

export type SplitMapLayers = {[key: string]: boolean};
export type SplitMap = {
  id?: string;
  layers: SplitMapLayers;
};

/** See "Locale aware formats" at https://momentjs.com/docs/#/parsing/string-format/ */
export type AnimationConfigTimeFormat = 'L' | 'L LT' | 'L LTS';

export type AnimationConfig = {
  domain: number[] | null;
  currentTime: number | null;
  speed: number;
  duration?: number | null;
  isAnimating?: boolean;
  timeSteps?: null | number[];
  // auto generated based on time domain
  defaultTimeFormat: AnimationTimeFormat | null;
  // custom ui input
  timeFormat?: AnimationTimeFormat | null;
  // custom ui input
  timezone?: string | null;
  // hide or show control
  hideControl?: boolean;
};

export type Timeline = {
  domain: [number, number] | null;
  value: number | [number, number];
  speed: number;
  isAnimating: boolean;
  step?: null | number;
  timeSteps?: null | number[];
  defaultTimeFormat?: null | string;
  timeFormat?: null | string;
  timezone?: null | string;
  animationWindow?: null | Filter['animationWindow'];
  marks?: null | number[];
} & Record<string, any>;

export type BaseInteraction = {
  label: string;
  enabled: boolean;
};
export type TooltipField = {
  name: string;
  format: string | null;
};
export type CompareType = string | null;
export type TooltipInfo = BaseInteraction & {
  id: 'tooltip';
  config: {
    fieldsToShow: {
      [key: string]: TooltipField[];
    };
    compareMode: boolean;
    compareType: CompareType;
  };
};
export type Geocoder = BaseInteraction & {
  id: 'geocoder';
  position: number[] | null;
};
export type Brush = BaseInteraction & {
  id: 'brush';
  config: {
    size: number;
  };
};
export type Coordinate = BaseInteraction & {
  id: 'coordinate';
  position: number[] | null;
};
export type InteractionConfig = {
  tooltip: TooltipInfo;
  geocoder: Geocoder;
  brush: Brush;
  coordinate: Coordinate;
};
export type MapInfo = {
  title: string;
  description: string;
};
export type FileLoading = {
  filesToLoad: FileList;
  onFinish: (payload: any) => any;
  fileCache: any[];
};
export type FileLoadingProgress = {
  [key: string]: {
    percent: number;
    message: string;
    fileName: string;
    error: any;
  };
};

export type LayerGroup = {
  slug: string;
  filter(layer: {id: string}): boolean;
  defaultVisibility: boolean;
};

export type CustomStyleType =
  | 'LOCAL'
  | 'MANAGED'
  // boolean for backwards compatability with previous map configs
  | boolean;

export type BaseMapStyle = {
  id: string;
  label: string;
  url: string;
  icon: string;
  style?: Object;
  layerGroups: LayerGroup[];
  accessToken?: string;
  custom?: CustomStyleType;
  colorMode?: BASE_MAP_COLOR_MODES;
  complimentaryStyleId?: string;
};

export declare type ExportImage = {
  ratio: 'SCREEN' | 'FOUR_BY_THREE' | 'SIXTEEN_BY_NINE' | 'CUSTOM';
  resolution: 'ONE_X' | 'TWO_X';
  legend: boolean;
  mapH: number;
  mapW: number;
  imageSize: {
    zoomOffset: number;
    scale: number;
    imageW: number;
    imageH: number;
  };
  imageDataUri: string;
  exporting: boolean;
  processing: boolean;
  error: Error | false;
  center: boolean;
};

export type ExportData = {
  selectedDataset: string;
  dataType: string;
  filtered: boolean;
};

export type ExportHtml = {
  exportMapboxAccessToken: null | string;
  userMapboxToken: string;
  mode: string;
};
export type ExportJson = {
  hasData: boolean;
};
export type ExportMap = {
  HTML: ExportHtml;
  JSON: ExportJson;
  format: 'HTML' | 'JSON';
};

export type MapControlItem = {
  show: boolean;
  active: boolean;
  disableClose?: boolean;
  activeMapIndex?: number;
};
export type MapControls = {
  visibleLayers?: MapControlItem;
  mapLegend?: MapControlItem;
  toggle3d?: MapControlItem;
  splitMap?: MapControlItem;
  mapDraw?: MapControlItem;
  mapLocale?: MapControlItem;
  effect?: MapControlItem;
};

export type LoadFiles = {
  fileLoading: boolean;
};

export type Notifications = {
  message: string;
  type: string;
  topic: string;
  id: string;
  count: number;
  isExpanded?: boolean;
};

export type Locale = string;

export type PanelListView = string;

export type UiState = {
  readOnly: boolean;
  activeSidePanel: string | null;
  currentModal: string | null;
  datasetKeyToRemove: string | null;
  visibleDropdown: string | null;
  // export image modal ui
  exportImage: ExportImage;
  // export data modal ui
  exportData: ExportData;
  // html export
  exportMap: ExportMap;
  // map control panels
  mapControls: MapControls;
  // ui notifications
  notifications: Notifications[];
  // load files
  loadFiles: LoadFiles;
  // Locale of the UI
  locale: Locale;
  // view layers by list or dataset
  layerPanelListView: PanelListView;
  // view filters by list or dataset
  filterPanelListView: PanelListView;
  // side panel close button visibility
  isSidePanelCloseButtonVisible: boolean | null;
};

/** Width of viewport */
export type Viewport = {
  /**  Width of viewport */
  width?: number;
  /**  Height of viewport */
  height?: number;
  /**  Zoom of viewport */
  zoom?: number;
  /**  Camera angle in degrees (0 is straight down) */
  pitch?: number;
  /**  Map rotation in degrees (0 means north is up) */
  bearing?: number;
  /**  Latitude center of viewport on map in mercator projection */
  latitude?: number;
  /**  Longitude Center of viewport on map in mercator projection */
  longitude?: number;
  /**  Whether to enable drag and rotate map into perspective viewport */
  dragRotate?: boolean;
  /**  Minimum allowed viewport zoom */
  minZoom?: number;
  /**  Maximum allowed viewport zoom */
  maxZoom?: number;
  /**  Maximum geographical bounds, pan/zoom operations are constrained within those bounds */
  maxBounds?: Bounds;
};

export type MapStyles = {
  [key: string]: BaseMapStyle;
};

export type VisibleLayerGroups = {
  [key: string]: boolean;
};

export type InputStyle = {
  id?: string | null;
  accessToken: string | null;
  error: boolean;
  isValid: boolean;
  label: string | null;
  style: any | null;
  url: string | null;
  icon: string | null;
  custom: CustomStyleType;
  uploadedFile: File | null;
};

export type FilterRecord = {
  dynamicDomain: Filter[];
  fixedDomain: Filter[];
  cpu: Filter[];
  gpu: Filter[];
};

export type FilterDatasetOpt = {
  // only allow cpu filtering
  cpuOnly?: boolean;
  // ignore filter for domain calculation
  ignoreDomain?: boolean;
};

/* DUPLICATES OF FILTER TYPES ABOVE, REMOVE ONCE TYPES ABOVE ARE FIXED */

type FilterBaseOmitRedudant = Omit<FilterBase<LineChart>, 'type' | 'domain'>;

export type TypedRangeFilter = FilterBaseOmitRedudant &
  RangeFieldDomain & {
    type: 'range';
    fieldType: 'real' | 'integer';
    value: [number, number];
    fixedDomain: true;
    typeOptions: ['range'];
  };

export type TypedSelectFilter = FilterBaseOmitRedudant &
  SelectFieldDomain & {
    type: 'select';
    fieldType: 'boolean';
    value: boolean;
  };

export type TypedMultiSelectFilter = FilterBaseOmitRedudant &
  MultiSelectFieldDomain & {
    type: 'multiSelect';
    fieldType: 'string' | 'date';
    value: string[];
  };

export type TypedTimeRangeFilter = FilterBaseOmitRedudant &
  TimeRangeFieldDomain & {
    type: 'timeRange';
    fieldType: 'timestamp';
    fixedDomain: true;
    value: [number, number];
    bins?: Object;
    plotType: {
      [key: string]: any;
    };
    animationWindow: string;
  };

export type TypedPolygonFilter = FilterBaseOmitRedudant & {
  layerId: string[];
  type: 'polygon';
  fixedDomain: true;
  value: Feature;
};

export type TypedFilter =
  | TypedRangeFilter
  | TypedTimeRangeFilter
  | TypedSelectFilter
  | TypedMultiSelectFilter
  | TypedPolygonFilter;
