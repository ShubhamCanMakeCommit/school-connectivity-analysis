import React, { useEffect } from 'react'

import BangaloreRegionBoundaries from '../data/bangalore_region_boundaries.json'

import * as d3 from 'd3'

// selector: CSS selector selecting Svg element or any
// width: width of Svg element or selected element using selector
// height: height of the same
export default function useBangaloreMap({ width, height, selector }) {
  useEffect(() => {
    // Join the FeatureCollection's features array to path elements
    const map = d3.select(selector)
    const projection = d3
      .geoMercator()
      .translate([width / 2, height / 2])
      // scale to zoom on the center
      .scale(Math.pow(3, 11))
      //coordinates of bangalore
      .center([77.624566, 12.981599])

    const geoGenerator = d3.geoPath().projection(projection)

    //Generate map below
    // Create path elements and update the d attribute using the geo generator
    map
      .append('g')
      .attr('id', '12-bng-map')
      .selectAll('path')
      .data(BangaloreRegionBoundaries.features)
      .enter()
      .append('path')
      .attr('d', geoGenerator)
      //Assign each path to it's ward name and region name(ASS_CONST1)
      .attr('id', (d) => d.properties.WARD_NAME)
      .attr('class', (d) => d.properties.ASS_CONST1)
  }, [width, height, selector])
}