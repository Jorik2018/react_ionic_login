import './DataTable.css';
import { http } from '../utils/fetch-wrapper.js';
import { IonCheckbox } from '@ionic/react';

import React, { useState, useEffect } from 'react';

interface ContainerProps {
  data?: any[];
  columns: any[];
  src?:string;
}

const DataTable: React.FC<ContainerProps> = ({ columns,data,src}) => {
	const [filteredData, setFilteredData] = useState<any[]>();
	const [selected, setSelected] = useState<any[]>([]);
	const [allSelected, setAllSelected] = useState(false);
	if(data)setFilteredData(data);
	var i=0,key=0;
	var body;
	const rowSelect=(e,row,index) => {
		var nSelected=JSON.parse(JSON.stringify(selected));
		if(index==-10){
			if(e.target.checked){
				for (var j = 0; j < filteredData.length; j++){					
					nSelected.push(j);
				}
			}else{
				nSelected=[];
			}
			//setAllSelected(row.detail.checked);
		}else{
			var ii=nSelected.indexOf(index);
			if(e.target.checked){
				 if(ii==-1)nSelected.push(index);
			}else{
				if(ii>-1)nSelected.splice(ii,1);
			}
		}
		setSelected(nSelected);
	}
	
	const isSelected=(index) => {
		return selected.some((e)=>{return e === index});
	}
	
	const renderAuthButton = () => {
		return (filteredData?filteredData:[]).map((row,index) => <tr key={i++} className={isSelected(index)?'v-selected':''}>
				<td><IonCheckbox slot="end" color="primary" checked={isSelected(index)} onClick={e => rowSelect(e,row,index)}/></td>
				{
					columns.map((c) => <td width={c.width} key={i++}>{c.render?c.render(row):row[c.dataIndex]}</td>)
				}</tr>)
	}
	const render=()=>{
		return (
			<div className="v-datatable" key={key}>
				<table className="v-table">
					<thead>
						<tr>
							<th><IonCheckbox checked={allSelected} onIonChange={e =>{setAllSelected(e.detail.checked);rowSelect(e,e,-10)}} color="primary" /></th>
							{columns.map((c) => <th style={{width:c.width}} key={i++}>{c.title}</th>)}
						</tr>
					</thead>
					<tbody>
						{renderAuthButton()}
					</tbody>
				</table>
			</div>
		)
	};
	useEffect(() => {
		if(src)
			http.get(src).then((d)=>{
				key++;
				data=d.data;
				setFilteredData(data);
			});
		
    }, []);
	return filteredData?render():null;
};

export default DataTable;
