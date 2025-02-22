// Copyright (c) 2023 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {BASE_MAP_COLOR_MODES, DEFAULT_LAYER_GROUPS} from '@kepler.gl/constants';

/** @type {import('@kepler.gl/reducers').BaseMapStyle} */
export const MOCK_MAP_STYLE = {
  id: 'dark',
  label: 'Dark',
  url: 'mapbox://styles/xxxxx/abcdefg',
  icon: 'https://my.icon.net/kepler.gl/test/taro.png',
  layerGroups: DEFAULT_LAYER_GROUPS,
  colorMode: BASE_MAP_COLOR_MODES.DARK,
  complimentaryStyleId: 'light',
  style: {
    version: 8,
    name: 'Mock-Map-Style',
    metadata: {},
    center: [-73.96109142750214, 40.74028310359776],
    zoom: 12.624759221889015,
    bearing: 23.936999544510627,
    pitch: 0,
    light: {
      anchor: 'viewport'
    },
    sources: {
      composite: {
        url: 'mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7,eklimcz.00zz64mq',
        type: 'vector'
      }
    },
    sprite: 'mapbox://sprites',
    glyphs: 'mapbox://fonts',
    layers: [
      {
        id: 'background',
        type: 'background',
        layout: {},
        paint: {
          'background-color': '#09101D'
        },
        interactive: true
      },
      {
        id: 'water',
        type: 'fill',
        source: 'composite',
        'source-layer': 'water',
        layout: {},
        paint: {
          'fill-color': '#112330'
        },
        interactive: true
      },
      {
        id: 'road-path-rough',
        type: 'line',
        source: 'composite',
        'source-layer': 'road'
      },
      {
        minzoom: 13,
        type: 'line',
        source: 'composite',
        id: 'bridge-rail',
        'source-layer': 'road'
      },
      {
        type: 'symbol',
        source: 'composite',
        id: 'country-label-sm',
        'source-layer': 'country_label'
      }
    ]
  }
};

/** @type {import('@kepler.gl/reducers').BaseMapStyle} */
export const MOCK_MAP_STYLE_LIGHT = {
  id: 'light',
  label: 'Light',
  url: 'mapbox://styles/xxxxx/hijklmn',
  icon: 'https://my.icon.net/kepler.gl/test/blue.png',
  layerGroups: DEFAULT_LAYER_GROUPS,
  colorMode: BASE_MAP_COLOR_MODES.LIGHT,
  complimentaryStyleId: 'dark',
  style: {
    version: 8,
    name: 'Mock-Map-Style-LIGHT',
    metadata: {},
    center: [-73.96109142750214, 40.74028310359776],
    zoom: 12.624759221889015,
    bearing: 23.936999544510627,
    pitch: 0,
    light: {
      anchor: 'viewport'
    },
    sources: {
      composite: {
        url: 'mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7,eklimcz.00zz64mq',
        type: 'vector'
      }
    },
    sprite: 'mapbox://sprites',
    glyphs: 'mapbox://fonts',
    layers: [
      {
        id: 'background',
        type: 'background',
        layout: {},
        paint: {
          'background-color': '#FFFFFF'
        },
        interactive: true
      },
      {
        id: 'water',
        type: 'fill',
        source: 'composite',
        'source-layer': 'water',
        layout: {},
        paint: {
          'fill-color': '#FEFEFE'
        },
        interactive: true
      },
      {
        id: 'building',
        type: 'fill',
        paint: {
          'fill-color': '#C8C8C8'
        }
      },
      {
        id: 'road-major',
        type: 'line',
        source: 'composite',
        'source-layer': 'road'
      },
      {
        type: 'line',
        source: 'composite',
        id: 'street-major',
        'source-layer': 'road'
      },
      {
        type: 'symbol',
        source: 'composite',
        id: 'admin-label-lg',
        'source-layer': 'country_label'
      }
    ]
  }
};

/** @type {import('@kepler.gl/reducers').MapStyles} */
export const MOCK_MAP_STYLES = {
  [MOCK_MAP_STYLE.id]: MOCK_MAP_STYLE,
  [MOCK_MAP_STYLE_LIGHT.id]: MOCK_MAP_STYLE_LIGHT
};
