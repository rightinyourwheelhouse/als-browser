import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

const FAQTile = ({ title, children, type }) => {
	const [isOpen, setIsOpen] = useState(false);

  let bgClassNames = "";
  let fadeClassNames = "";
  switch (type) {
    case "important":
      bgClassNames = "bg-green-200";
      fadeClassNames = "from-green-200";
      break;

    case "bug":
      bgClassNames = "bg-red-200";
      fadeClassNames = "from-red-200";
      break;

    case "warning":
      bgClassNames = "bg-yellow-200";
      fadeClassNames = "from-yellow-200";
      break;
  
    default:
      fadeClassNames = "from-white";
      break;
  }

	const expandTile = () => {
    const tile = document.getElementById(`${title}-tile`);
    const fade = document.getElementById(`${title}-fade`);
    tile.classList.remove('h-min', 'max-h-[8rem]', 'overflow-hidden');
    tile.classList.add('overflow-visible', 'max-h-fit');
    fade.classList.add('hidden');
	};

  const shrinkTile = () => {
    const tile = document.getElementById(`${title}-tile`);
    const fade = document.getElementById(`${title}-fade`);
    tile.classList.remove('overflow-visible', 'max-h-fit');
    tile.classList.add('h-min', 'max-h-[8rem]', 'overflow-hidden');
    fade.classList.remove('hidden');
  };

	return (
		<div id={`${title}-tile`} className={`relative rounded-xl my-5 h-min max-h-[8rem] overflow-hidden p-5 shadow ${bgClassNames}`}>
			<div id={`${title}-fade`} className={`absolute top-[50%] left-0 h-1/2 w-full bg-gradient-to-t ${fadeClassNames}`}></div>
			<div className="flex items-start justify-between">
				<h2 className="mb-2 text-xl font-bold">{title}</h2>
				{isOpen ? (
					<ChevronUpIcon
            id={`${title}-toggle`}
						className="h-6 w-6 text-gray-600 cursor-pointer"
						onClick={() => {
							setIsOpen(false);
              shrinkTile();
						}}
					/>
				) : (
					<ChevronDownIcon
            id={`${title}-toggle`}
						className="h-6 w-6 text-gray-600 cursor-pointer"
						onClick={() => {
							setIsOpen(true);
              expandTile();
						}}
					/>
				)}
			</div>
			{children}
		</div>
	);
};

export default FAQTile;
