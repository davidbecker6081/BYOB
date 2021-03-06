const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });
const fs = require('fs');
const beerInfo = [];
const links = [
	'/brewers/105-west-brewing-company/25013/',
	'/brewers/12-degree-brewing/17028/',
	'/brewers/14er-brewing-company/28355/',
	'/brewers/2-rascals-brewing-company/16847/',
	'/brewers/3-freaks-brewery/21224/',
	'/brewers/300-suns-brewing/17785/',
	'/brewers/38-state-brewing-company/19726/',
	'/brewers/4-noses-brewing-company/19689/',
	'/brewers/4bs-brewery/23612/',
	'/brewers/5280-nrg-llc/18903/',
	'/brewers/7-hermits-brewing-company/20521/',
	'/brewers/acidulous-brewing-company/26985/',
	'/brewers/alpine-dog-brewery/21444/',
	'/brewers/amalgam-brewing/27376/',
	'/brewers/amicas-pizza-microbrew/4030/',
	'/brewers/animas-brewing-company/21746/',
	'/brewers/arvada-beer-company/13517/',
	'/brewers/asher-brewing-company/11019/',
	'/brewers/aspen-brewing-company/9776/',
	'/brewers/atom-brewing-company/26956/',
	'/brewers/avalanche-brewing-company/20662/',
	'/brewers/avery-brewing-company/15/',
	'/brewers/backcountry-brewery-co/396/',
	'/brewers/baere-brewing-company/20483/',
	'/brewers/banded-oak-brewing-company/27506/',
	'/brewers/barnett-son-brewing-company/28797/',
	'/brewers/barrels-and-bottles-brewery/17720/',
	'/brewers/beer-by-design-brewery/17130/',
	'/brewers/berthoud-brewing-company/20264/',
	'/brewers/beryls-beer-company/20255/',
	'/brewers/bierstadt-lagerhaus/28498/',
	'/brewers/bierwerks/11983/',
	'/brewers/big-beaver-brewing-company/12749/',
	'/brewers/big-choice-brewing/14488/',
	'/brewers/big-nose-brewing/13440/',
	'/brewers/big-thompson-brewery/24900/',
	'/brewers/black-bottle-brewery/15698/',
	'/brewers/black-project-spontaneous-wild-ales/18791/',
	'/brewers/black-shirt-brewing-company/15377/',
	'/brewers/black-sky-brewery/17766/',
	'/brewers/blue-moon-brewing-company-millercoors/29144/',
	'/brewers/blue-spruce-brewing-company/19329/',
	'/brewers/boggy-draw-brewery/24205/',
	'/brewers/bonfire-brewing/12305/',
	'/brewers/bootstrap-brewing/14747/',
	'/brewers/bottom-shelf-brewery/30021/',
	'/brewers/boulder-beer-company/375/',
	'/brewers/breckenridge-brewery-ab-inbev/383/',
	'/brewers/brew-pub-kitchen/17131/',
	'/brewers/brewability-lab/30235/',
	'/brewers/brewery-rickoli/15658/',
	'/brewers/briar-common-brewery-eatery/28796/',
	'/brewers/bristol-brewing-company/482/',
	'/brewers/brix-taphouse-brewery/31685/',
	'/brewers/broken-compass-brewing-company/19835/',
	'/brewers/broken-plow-brewing-company/20052/',
	'/brewers/bru-handbuilt-ales/14360/',
	'/brewers/brues-alehouse-brewing-company/25489/',
	'/brewers/bruz-beers/28118/',
	'/brewers/buckhorn-brewers/18110/',
	'/brewers/bull-bush-pub-brewery/2630/',
	'/brewers/burgundian-brewing/30934/',
	'/brewers/butcherknife-brewing-company/20289/',
	'/brewers/cb-potts-ram-international/15937/',
	'/brewers/call-to-arms-brewing-company/21132/',
	'/brewers/cannonball-creek-brewing-company/16149/',
	'/brewers/capitol-creek-brewery/32064/',
	'/brewers/carbondale-beer-works/12858/',
	'/brewers/carver-brewing-company/3530/',
	'/brewers/casey-brewing-and-blending/20202/',
	'/brewers/castle-rock-beer-company/28553/',
	'/brewers/caution-brewing-company/13443/',
	'/brewers/cellar-west-artisan-ales/29667/',
	'/brewers/centennial-beer-company/18223/',
	'/brewers/cerberus-brewing-company/28801/',
	'/brewers/cerebral-brewing/25172/',
	'/brewers/chain-reaction-brewing-company/20010/',
	'/brewers/cheluna-brewing-company/29747/',
	'/brewers/chophouse-brewery-denver-owned-by-rock-bottom/1074/',
	'/brewers/city-star-brewing/14469/',
	'/brewers/co-brew/23832/',
	'/brewers/coda-brewing-company/27118/',
	'/brewers/cogstone-brewing-company/26058/',
	'/brewers/colorado-boy/10623/',
	'/brewers/colorado-mountain-brewery/11029/',
	'/brewers/colorado-plus/16981/',
	'/brewers/comrade-brewing-company/19544/',
	'/brewers/conor-oneills-traditional-irish-pub/5894/',
	'/brewers/coopersmiths-pub-brewing/483/',
	'/brewers/coors-brewing-company-millercoors/113/',
	'/brewers/copper-club-brewing/17132/',
	'/brewers/copper-kettle-brewing-co/12784/',
	'/brewers/crabtree-brewing-company/6916/',
	'/brewers/crazy-mountain-brewing-company/11251/',
	'/brewers/creede-brewing-company/19358/',
	'/brewers/crestone-brewing-company/30937/',
	'/brewers/crooked-stave/12624/',
	'/brewers/crow-hop-brewery/18115/',
	'/brewers/crystal-springs-brewing-company/11866/',
	'/brewers/dad-and-dudes-breweria/12437/',
	'/brewers/dc-oakes-brewhouse-eatery/32066/',
	'/brewers/de-steeg-brewing/16118/',
	'/brewers/dead-hippie-brewing/25953/',
	'/brewers/declaration-brewing/22228/',
	'/brewers/deep-draft-brewing-company/24499/',
	'/brewers/denver-beer-company/13238/',
	'/brewers/diebolt-brewing-company/17464/',
	'/brewers/dillon-dam-brewery-restaurant/199/',
	'/brewers/dodgeton-creek-brewing-company/23140/',
	'/brewers/dolores-river-brewery/7316/',
	'/brewers/dostal-alley-casino-brew-pub/2880/',
	'/brewers/dry-dock-brewing-company/6252/',
	'/brewers/durango-brewing-company/2229/',
	'/brewers/echo-brewing-company/14538/',
	'/brewers/eddyline-restaurant-and-brewery/10646/',
	'/brewers/el-rancho-brewing-company/25532/',
	'/brewers/elevation-beer-company/14361/',
	'/brewers/elk-mountain-brewing-company/11564/',
	'/brewers/endo-brewing-company/30505/',
	'/brewers/equinox-brewing/11563/',
	'/brewers/estes-park-brewery/271/',
	'/brewers/evergreen-tap-house-brewery/30417/',
	'/brewers/factotum-brewhouse/22253/',
	'/brewers/fate-brewing-company-co/16077/',
	'/brewers/fermntra/21499/',
	'/brewers/fiction-beer-company/20802/',
	'/brewers/fieldhouse-brewing-company/19662/',
	'/brewers/finkel-and-garf-brewing/20918/',
	'/brewers/floodstage-ale-works/12775/',
	'/brewers/florence-brewing-company/27222/',
	'/brewers/former-future-brewing-company/30858/',
	'/brewers/fort-collins-brewery/3891/',
	'/brewers/fossil-craft-beer-company/18734/',
	'/brewers/front-range-brewing-company/17032/',
	'/brewers/funkwerks/12024/',
	'/brewers/gemini-beer-co/25337/',
	'/brewers/gilded-goat-brewing-company/30592/',
	'/brewers/glenwood-canyon-brewing-company/484/',
	'/brewers/gold-camp-brewing-company/24768/',
	'/brewers/golden-block-brewery/27811/',
	'/brewers/golden-city-brewery/1160/',
	'/brewers/goldspot-brewing-company/22009/',
	'/brewers/good-river-beer-company/25204/',
	'/brewers/gore-range-brewery/1875/',
	'/brewers/grand-lake-brewing-co/4945/',
	'/brewers/grandmas-house/21181/',
	'/brewers/gravity-brewing/15092/',
	'/brewers/great-divide-brewing-company/292/',
	'/brewers/great-frontier-brewing-company/24578/',
	'/brewers/great-storm-brewing/14317/',
	'/brewers/green-mountain-beer-company/29545/',
	'/brewers/grimm-brothers-brewhouse/11990/',
	'/brewers/grist-brewing-company/18453/',
	'/brewers/grossen-bart-brewery/22022/',
	'/brewers/guanella-pass-brewing-company/32067/',
	'/brewers/gunbarrel-brewing-company/21882/',
	'/brewers/gunnison-brewery/4926/',
	'/brewers/halfpenny-brewing-company/29005/',
	'/brewers/hall-brewing-company/15948/',
	'/brewers/hardtail-brewing-company/13069/',
	'/brewers/hideaway-park-brewery/22596/',
	'/brewers/high-alpine-brewing-company/26986/',
	'/brewers/high-hops-brewery/15338/',
	'/brewers/hogshead-brewery/14134/',
	'/brewers/holidaily-brewing-company/25945/',
	'/brewers/horse-dragon-brewing-company/19547/',
	'/brewers/horsefly-brewing-company/10837/',
	'/brewers/idylwilde-brewing-company/32414/',
	'/brewers/industrial-revolution-brewing/18175/',
	'/brewers/intersect-brewing/29495/',
	'/brewers/iron-bird-brewing-company/20524/',
	'/brewers/ironworks-brewery-and-pub/1870/',
	'/brewers/irwin-brewing-company/30419/',
	'/brewers/j-wells-brewery/15906/',
	'/brewers/j-fargos-family-dining-microbrewery/10655/',
	'/brewers/jagged-mountain-craft-brewery/17848/',
	'/brewers/jaks-brewing-company/25537/',
	'/brewers/james-peak-brewery-smokehouse/30426/',
	'/brewers/jessup-farm-barrel-house/26364/',
	'/brewers/joyride-brewing-company/20331/',
	'/brewers/kannah-creek-brewing-company/7314/',
	'/brewers/kettle-and-spoke-brewery/29706/',
	'/brewers/kokopelli-beer-company/17283/',
	'/brewers/krueger-brewing-company/28589/',
	'/brewers/lady-justice-brewing/31296/',
	'/brewers/landlocked-ales/31987/',
	'/brewers/lariat-lodge-brewing-company/24053/',
	'/brewers/larimer-beer-company/30935/',
	'/brewers/launch-pad-brewery/23825/',
	'/brewers/left-hand-brewing-company/78/',
	'/brewers/leieritz-brewing-company-three-daughters/11766/',
	'/brewers/liquid-mechanics-brewing-company/20571/',
	'/brewers/little-machine-beer/24975/',
	'/brewers/living-the-dream-brewing-company/20590/',
	'/brewers/local-relic/26276/',
	'/brewers/locavore-beer-works/21434/',
	'/brewers/lone-tree-brewing-company/13805/',
	'/brewers/lost-highway-brewing-company/17845/',
	'/brewers/loveland-aleworks/14867/',
	'/brewers/lowdown-brewery-kitchen/18872/',
	'/brewers/lumpy-ridge-brewing-company/24268/',
	'/brewers/mad-jacks-mountain-brewery/28794/',
	'/brewers/mahogany-ridge-brewery-grille/3840/',
	'/brewers/mancos-brewing-company/20761/',
	'/brewers/manitou-brewing-company/19542/',
	'/brewers/maxline-brewing/27427/',
	'/brewers/mcclellans-brewing-company/26013/',
	'/brewers/mesa-cerveza-main-street-brewing/2462/',
	'/brewers/mockery-brewing/21441/',
	'/brewers/moffat-station-restaurant-brewery/3037/',
	'/brewers/moonlight-pizza-and-brewpub/14121/',
	'/brewers/mother-tucker-brewery/31878/',
	'/brewers/mountain-sun-pub-brewery/1926/',
	'/brewers/mountain-tap-brewery/27915/',
	'/brewers/mountain-toad-brewing/16813/',
	'/brewers/mr-grumpy-pants-brewing-company-ourayle-house/10589/',
	'/brewers/nano-108-brewing-company/18403/',
	'/brewers/never-summer-brewing-company/29560/',
	'/brewers/new-belgium-brewing-company/77/',
	'/brewers/new-image-brewing-company/25720/',
	'/brewers/new-planet-beer-company/11033/',
	'/brewers/new-terrain-brewing-company/23567/',
	'/brewers/nighthawk-brewery/21909/',
	'/brewers/oasis-brewing-company/24634/',
	'/brewers/odd13-brewing/17308/',
	'/brewers/odell-brewing-company/371/',
	'/brewers/odyssey-beerwerks/16787/',
	'/brewers/old-colorado-brewing-company/28736/',
	'/brewers/old-mill-brewery-and-grill/10656/',
	'/brewers/open-door-brewing-company/24054/',
	'/brewers/oskar-blues-brewery/2137/',
	'/brewers/our-mutual-friend-malt-brew/15386/',
	'/brewers/ouray-brewery/12168/',
	'/brewers/outer-range-brewing/30049/',
	'/brewers/pagosa-brewing-company/8023/',
	'/brewers/palisade-brewing-company/12075/',
	'/brewers/paradox-beer-company/15256/',
	'/brewers/pats-backcountry-beverages/22375/',
	'/brewers/pdub-brewing-company/32070/',
	'/brewers/peak-to-peak-tap-and-brew/31612/',
	'/brewers/peaks-n-pines-brewing-company/25533/',
	'/brewers/periodic-brewing/28117/',
	'/brewers/phantom-canyon-brewing/637/',
	'/brewers/pikes-peak-brewing-company/12947/',
	'/brewers/pints-pub-brewery-freehouse/3087/',
	'/brewers/platt-park-brewing-company/19786/',
	'/brewers/powder-keg-brewing-company/19884/',
	'/brewers/prost-brewing-company/14929/',
	'/brewers/pug-ryans-steakhouse-and-brewery/485/',
	'/brewers/pumphouse-brewery-and-restaurant/2240/',
	'/brewers/purpose-brewing-and-cellars/19159/',
	'/brewers/rails-end-beer-company/28392/',
	'/brewers/rally-king-brewing/23999/',
	'/brewers/ratio-beerworks/21959/',
	'/brewers/red-leg-brewing/17129/',
	'/brewers/renegade-brewing-company/12999/',
	'/brewers/resolute-brewing-company/28635/',
	'/brewers/revolution-brewing/10654/',
	'/brewers/riff-raff-brewing-company/19797/',
	'/brewers/river-north-brewery/14072/',
	'/brewers/roaring-fork-beer-company/19847/',
	'/brewers/rock-bottom-colorado-springs/6551/',
	'/brewers/rock-bottom-denver/4296/',
	'/brewers/rock-bottom-loveland/8732/',
	'/brewers/rock-bottom-south-denver/4297/',
	'/brewers/rock-bottom-westminster-orchard-town-center/10878/',
	'/brewers/rock-bottom-westminster/4295/',
	'/brewers/rockcut-brewing-co/24266/',
	'/brewers/rockslide-brew-pub/2212/',
	'/brewers/rocky-mountain-brewery/9702/',
	'/brewers/rockyard-brewing-company/628/',
	'/brewers/royal-gorge-brewing-company/20660/',
	'/brewers/rustica-brewing-company/32312/',
	'/brewers/saint-patricks-brewing-company/17719/',
	'/brewers/san-luis-valley-brewing-company/6935/',
	'/brewers/sandlot-brewery-molsoncoors/3168/',
	'/brewers/sanitas-brewing-company/16985/',
	'/brewers/seedstock-brewery/27037/',
	'/brewers/shamrock-brewing-co/6242/',
	'/brewers/shine-brewing-co/14276/',
	'/brewers/shoes-and-brews/23059/',
	'/brewers/ska-brewing/486/',
	'/brewers/skeye-brewing/24056/',
	'/brewers/sleeping-giant-brewing-company/21534/',
	'/brewers/smiling-toad-brewery/19319/',
	'/brewers/smugglers-brew-pub/487/',
	'/brewers/snowbank-brewing/20616/',
	'/brewers/some-place-else-brewery/28849/',
	'/brewers/something-brewery/26578/',
	'/brewers/soul-squared-brewing-company/25336/',
	'/brewers/soulcraft-brewing/30545/',
	'/brewers/south-park-brewing/21895/',
	'/brewers/spangalang-brewery/22749/',
	'/brewers/spice-trade-brewing/10167/',
	'/brewers/square-peg-brewerks/32063/',
	'/brewers/station-26-brewing-company/18357/',
	'/brewers/steamworks-brewing-company-us/743/',
	'/brewers/storm-peak-brewing-company/21435/',
	'/brewers/storybook-brewing/22266/',
	'/brewers/strange-craft-beer-company/11580/',
	'/brewers/telluride-brewing-company/13998/',
	'/brewers/the-bakers-brewery/23538/',
	'/brewers/the-brew-on-broadway-bob/17718/',
	'/brewers/the-eldo-brewery-taproom/6113/',
	'/brewers/the-intrepid-sojourner-beer-project/31855/',
	'/brewers/the-occasional-brew/21842/',
	'/brewers/the-peak-bistro-brewery/32072/',
	'/brewers/the-post-brewing-company/18629/',
	'/brewers/three-barrel-brewing-company/8987/',
	'/brewers/three-four-beer-co/28673/',
	'/brewers/tivoli-brewing-company/17041/',
	'/brewers/tommyknocker-brewery/1435/',
	'/brewers/trinity-brewing-company/9826/',
	'/brewers/triple-s-brewing-company/24637/',
	'/brewers/trve-brewing/14127/',
	'/brewers/twisted-pine-brewing/630/',
	'/brewers/two22-brew/19036/',
	'/brewers/upslope-brewing-company/10057/',
	'/brewers/ursula-brewery/18459/',
	'/brewers/ute-pass-brewing-company/22841/',
	'/brewers/uturn-bbq/32069/',
	'/brewers/vail-brewing-co/23539/',
	'/brewers/verboten-brewing-and-barrel-project/15943/',
	'/brewers/very-nice-brewing-company/15592/',
	'/brewers/veteran-brothers-brewing-company/32068/',
	'/brewers/vindication-brewing-company/16988/',
	'/brewers/vision-quest-brewing-company/24052/',
	'/brewers/walter-brewing-company/21709/',
	'/brewers/weldwerks-brewing-company/22079/',
	'/brewers/west-flanders-brewing-co/15295/',
	'/brewers/westbound-down-brewing-company/25581/',
	'/brewers/westfax-brewing-company/26315/',
	'/brewers/westminster-brewing-company/18355/',
	'/brewers/whistle-pig-brewing-company/26237/',
	'/brewers/wibby-brewing/23764/',
	'/brewers/wild-woods-brewery/15296/',
	'/brewers/wildedge-brewing-collective/32065/',
	'/brewers/wiley-roots-brewing-company/17213/',
	'/brewers/wits-end-brewing-company/13466/',
	'/brewers/wolfe-brewing-company/22683/',
	'/brewers/wonderland-brewing-company/19725/',
	'/brewers/woods-boss-brewing-company/33048/',
	'/brewers/wynkoop-brewing-company/1384/',
	'/brewers/yampa-valley-brewing-company/24409/',
	'/brewers/zephyr-brewing-company/21582/',
	'/brewers/zulu-brewing/28268/',
	'/brewers/zuni-street-brewing/30609/',
	'/brewers/zwei-brewing/20617/',
];

links
	.reduce(function(accumulator, url) {
		return accumulator.then(function(results) {
			return nightmare
				.goto(`https://www.ratebeer.com${url}`)
				.wait('body')
				.evaluate(() => {
					let beerArray = [];
					let breweryName = document.querySelector('h1').innerText;
					let beerTable = document.querySelector('tbody');
					let beers = beerTable.querySelectorAll('tr');

					for (let k = 0; k < beers.length; k++) {
						let beerName = beers[k].querySelector('a').innerText;
						let beerType = beers[k].querySelector('span').innerText;

						beerArray.push({ breweryName, beerName, beerType });
					}
					return beerArray;
				})
				.then(function(result) {
					results.push(result);
					return results;
				});
		});
	}, Promise.resolve([]))
	.then(function(results) {
		let output = JSON.stringify(results, null, 2);

		fs.writeFile('./co-beers-data.json', output, 'utf8', err => {
			if (err) {
				return err;
			}
		});
		/* eslint-disable no-alert, no-console */
		console.log('File was saved.');
		/* eslint-enable no-alert, no-console */
	})
	.catch(error => {
		/* eslint-disable no-alert, no-console */
		console.error('breweries search failed', error);
		/* eslint-enable no-alert, no-console */
	});
