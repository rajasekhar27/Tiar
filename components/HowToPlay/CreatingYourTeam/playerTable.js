import React from 'react';
import { Table } from 'reactstrap';

export default function PlayerTable(){
    return(
        <Table striped bordered={true} className="mt-5 mb-1">
        <thead>
          <tr className='text-left'>
            <th style={{width:'75%'}}>Player Type</th>
            <th style={{width:'50%'}}>Min</th>
            <th style={{width:'50%'}}>Max</th>
          </tr>
        </thead>
        <tbody>
          <tr className='text-left'> 
            <td>Wicket Keeper - WK</td>
            <th >1</th>
            <th >4</th>
          </tr>

          <tr>
            <td>Batter - BAT</td>
            <td>3</td>
            <td>6</td>
          </tr>

          <tr>
            <td>All Rounder - AR</td>
            <td>1</td>
            <td>4</td>
          </tr>

          <tr>
          <td>Bowler - BWL</td>
            <td>3</td>
            <td>6</td>
          </tr>
        </tbody>
      </Table>
    )
}