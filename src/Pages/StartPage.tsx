import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import ItemCard from '../Components/ItemCard';
import { db } from '../firebase';
import { IlistItem } from '../Interfaces';

function StartPage() {
	const listingsRef = collection(db, 'listings');
	const [listItems, setListItems] = useState([]);

	const getItems = () => {
		getDocs(listingsRef).then((data) => {
			setListItems(
				data.docs.map((item) => {
					return {
						...item.data(),
						id: item.id,
					};
				}) as any
			);
		});
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<div>
			{/* Header will go here from layout */}

			<div id="logoAndHeroText"></div>

			<div id="starPageBigPic"></div>

			<div id="categories"></div>

			<div id="recentlyAdded">
				{listItems.map((item: IlistItem) => {
					return <ItemCard key={item.id} item={item} />;
				})}
			</div>

			<div id="starPageInfoStuff"></div>

			{/* Footer will go here from layout */}
		</div>
	);
}

export default StartPage;
