import React from 'react';
import Title from '../../../Typography/Title';
import FAQTile from '../FAQTile';

const FAQSetting = () => {
	return (
		<div className="ml-10 h-[calc(100vh-5rem)] overflow-y-scroll pr-10">
			<Title className="my-8">Veelgestelde vragen</Title>
			<FAQTile title="Gebruiksaanwijzing" type="important">
				<p>
					Hier kunt u meer info vinden over hoe u de browser kan gebruiken. <br />
					<br /> Klik op de knop hieronder om de tutorial te starten.
				</p>
				<button className="mt-10 h-10 rounded-lg bg-dark-blue px-5 text-white">Start gebruiksaanwijzing</button>
			</FAQTile>
			<FAQTile title="Element inspecteren">
				<p className="mb-5">
					Als u een website bezoekt en u wilt een element inspecteren via de Developer-tools, kunt u dit doen via
					volgende toetsencombinaties:
					<ul className="list-disc pl-10">
						<li>ctrl+shift+c (element inspecteren)</li>
						<li>ctrl+shift+i (dev-tools openen)</li>
					</ul>
				</p>
				<p>
					Aangezien wij de rechter muisknop gebruiken voor het cirkelvormig menu, is de standaard rechter
					muisknop-werking uitgeschakeld.
				</p>
			</FAQTile>
			<FAQTile title="Overflow test">
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi corporis distinctio laboriosam minus
					reprehenderit! Quaerat doloribus et laborum ducimus molestiae vitae? Eaque deleniti earum vitae, sunt eligendi
					inventore vel eveniet animi. Repellat aspernatur velit accusantium reiciendis quibusdam suscipit,
					necessitatibus obcaecati. Nulla est non hic odio in? Officiis, non corporis porro provident reprehenderit
					dicta qui ex sed alias quae, possimus odit consequatur distinctio! Officia nihil reprehenderit blanditiis
					repellendus fugiat praesentium odit nisi culpa minus rerum voluptas ex, sint quibusdam delectus omnis qui
					quasi temporibus, perferendis dignissimos amet? Eaque voluptas consectetur doloribus accusamus iure et vitae
					nostrum a? Placeat, exercitationem sequi voluptate iure, ut a ipsam iusto perferendis at officiis eos aut
					atque, magnam ipsa ea tempore doloribus quae tenetur nulla nam libero! Sapiente neque fugit maxime eum esse
					debitis error necessitatibus quae laboriosam! Quae in vitae veniam doloremque optio tenetur temporibus commodi
					minus, aperiam vel earum exercitationem possimus neque voluptas quaerat ut maiores sapiente fugiat fuga ex!
					Tempora molestias cupiditate repellendus laborum repellat, excepturi quam temporibus. Consectetur saepe
					officiis iste laboriosam minus ratione sapiente! Totam suscipit error aut hic ab possimus similique sunt
					molestiae. Voluptas vero ipsa eius consectetur doloremque ullam, magni harum unde voluptate. Nihil quas cumque
					sed dolores doloremque.
				</p>
			</FAQTile>
		</div>
	);
};

export default FAQSetting;
