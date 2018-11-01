import React from 'react';
import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinkListFilters from './LinksListFilters';


export default () =>{
  return (
    <div>
        <PrivateHeader title="Link App"/>
        <div className="page-content">
        <LinkListFilters/>
        <AddLink/>
        <LinksList/>
        </div>
    </div>
  );
}

