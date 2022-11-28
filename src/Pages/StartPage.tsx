import React from 'react';
import ItemCard from '../Components/ItemCard';


function StartPage() {
  return (
    <div >
      
      {/* Header will go here from layout */}

      <div id='logoAndHeroText'></div>

      <div id='starPageBigPic'></div>

      <div id='categories'></div>

      <div id='recentlyAdded'>
        <ItemCard />
      </div>

      <div id='starPageInfoStuff'></div>

      {/* Footer will go here from layout */}
      
    </div>
  );
}

export default StartPage;
