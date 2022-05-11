
let htmlElements;
let inputBarClass;
let inputBar;
let testSearchBar;
let suggestionContainer;
let suggestionArray;
let testTable;
let searchButton;
let fuzzySearchResults = {};


function init() {
    console.log("start up hacky shit 2.0") 
    getElements();
}
function getElements(){
    searchButton = document.getElementById('searchButton');
    testSearchBar = document.getElementById("inputTest")
    searchButton.addEventListener('click',searchbarSearch);
    testSearchBar.addEventListener('input',searchbarInput);
}

function searchbarSearch(){
    location.href = `https://cse.google.com/cse?cx=6b7a9f71ab86fe6ab&q=${testSearchBar.value}&oq=${testSearchBar.value}`;
}
function searchbarInput(){
   getSuggestions();
}
async function getSuggestions(){
    suggestionTable = document.getElementById('suggestionTable')
    clearTable(suggestionTable)
    suggestionTableBody = suggestionTable.tBodies[0]
    let siteSuggestionCounter = 0;
    let searchResults = searchFuzzyHistory()
    for(let suggestion of searchResults){
        if (siteSuggestionCounter < 10){
            var newRow = suggestionTableBody.insertRow();
            var newCell = newRow.insertCell();
            newCell.style.border =  '1px solid red';
            var newText = document.createTextNode(suggestion.item.websiteName);
            newCell.addEventListener('click',clicked_cell_urlSuggestion)
            newCell.appendChild(newText);
        }
        siteSuggestionCounter++;
       
    }
    
   

function searchFuzzyHistory(){
    const options = {
         isCaseSensitive: false,
         includeScore: true,
         shouldSort: true,
        // includeMatches: false,
        findAllMatches: true,
        minMatchCharLength: 2,
        // location: 0,
        threshold: 0.49,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        keys: [
          "websiteName",
          "website.shortUrl"
        ]
      };
      
      const fuse = new Fuse(websiteList, options);
      console.log('----------------------------')
      // Change the pattern
      const pattern = testSearchBar.value
      let searchResults = fuse.search(pattern)
      fuzzySearchResults = {};
      for (let site of searchResults){
          console.log(site)
        fuzzySearchResults[site.item.websiteName] = site.item
      } 
      return searchResults
}    
function clicked_cell(e){
     location.href = `https://cse.google.com/cse?cx=6b7a9f71ab86fe6ab&q=${e.target.innerText}&oq=${testSearchBar.value}`
}
function clicked_cell_urlSuggestion(e){
    let websiteName = e.target.innerText;
    location.href = fuzzySearchResults[websiteName].website.url
}
    
}
function clearTable(table){
    table = suggestionTable.tBodies[0]
    while(table.rows.length > 0) {
        table.deleteRow(0);
      }
}


window.addEventListener('load', function () {
    init()
})

let websiteList = [
    {
      "websiteName": "VRT nieuws",
      "website": {
        "shortUrl": "vrt.be/vrtnws/",
        "url": "https://www.vrt.be/vrtnws/"
      }
    },
    {
        "websiteName": "Google",
        "website": {
          "shortUrl": "Google.com",
          "url": "https://www.Google.com"
      }
    },
    {
        "websiteName": "Youtube",
        "website": {
          "shortUrl": "YouTube.com",
          "url": "https://www.youtube.com"
      }
    },
    {
        "websiteName": "facebook",
        "website": {
          "shortUrl": " Facebook.com",
          "url": "https://www.facebook.com"
      }
    },
    {
        "websiteName": "Wikipedia",
        "website": {
          "shortUrl": "Wikipedia.org",
          "url": "https://www.Wikipedia.org"
      }
    },
    {
        "websiteName": "Amazon",
        "website": {
          "shortUrl": "Amazon.nl",
          "url": "https://www.Amazon.nl"
      }
    },
    {
        "websiteName": "",
        "website": {
          "shortUrl": "",
          "url": ""
      }
    },
    {
        "websiteName": "Reddit",
        "website": {
          "shortUrl": " Reddit.com",
          "url": "https://www.reddit.com"
      }
    },
    {
        "websiteName": "HLN",
        "website": {
          "shortUrl": "HLN.be",
          "url": "https://www.HLN.be"
      }
    },
    {
        "websiteName": "Instagram",
        "website": {
          "shortUrl": "Instagram.com",
          "url": "https://Instagram.com"
      }
    },
    {
        "websiteName": "Yahoo",
        "website": {
          "shortUrl": "Yahoo.com",
          "url": "https://Yahoo.com"
      }
    },
    {
        "websiteName": "Meteo",
        "website": {
          "shortUrl": "meteo.be/",
          "url": "https://www.meteo.be/en/belgium"
      }
    },
    {
        "websiteName": "kmi",
        "website": {
          "shortUrl": "meteo.be/",
          "url": "https://www.meteo.be/en/belgium"
      }
    },
    {
        "websiteName": "De standaard",
        "website": {
          "shortUrl": "standaard.be/",
          "url": "https://www.standaard.be/"
      }
    },
    {
        "websiteName": "Het nieuwsBlad",
        "website": {
          "shortUrl": "nieuwsblad.be/",
          "url": "https://www.nieuwsblad.be/"
      }
    },
    {
        "websiteName": "Gazet van Antwerpen",
        "website": {
          "shortUrl": "gva.be",
          "url": "https://www.gva.be/"
      }
    },
    {
        "websiteName": "Les sports+",
        "website": {
          "shortUrl": "dhnet.be/",
          "url": "https://www.dhnet.be/"
      }
    },
    {
        "websiteName": "vtm nieuws",
        "website": {
          "shortUrl": "www.hln.be/vtm-nieuws",
          "url": "https://www.hln.be/vtm-nieuws"
      }
    },
    {
        "websiteName": "Het Belang Van limburg",
        "website": {
          "shortUrl": "hbvl.be/",
          "url": "https://www.hbvl.be/"
      }
    },
    {
        "websiteName": "De morgen",
        "website": {
          "shortUrl": "demorgen.be",
          "url": "https://www.demorgen.be"
      }
    },
    {
        "websiteName": "De tijd",
        "website": {
          "shortUrl": "tijd.be",
          "url": "https://www.tijd.be/"
      }
    },
    {
        "websiteName": "KW",
        "website": {
          "shortUrl": "kw.be",
          "url": "https://kw.be/"
      }
    },
    {
        "websiteName": "Metro",
        "website": {
          "shortUrl": "metro.be",
          "url": "https://nl.metrotime.be/"
      }
    },
    {
        "websiteName": "Knack",
        "website": {
          "shortUrl": "knack.be",
          "url": "https://www.knack.be/"
      }
    },
    {
        "websiteName": "ALS liga Belgie",
        "website": {
          "shortUrl": "als.be",
          "url": "https://www.als.be/"
      }
    },
    {
        "websiteName": "brainjar",
        "website": {
          "shortUrl": "brainjar.ai",
          "url": "https://brainjar.ai"
      }
    },
    {
        "websiteName": "wheelhouse",
        "website": {
          "shortUrl": "wheelhouse.be",
          "url": "https://www.wheelhouse.be/"
      }
    },
    {
        "websiteName": "TPO agency",
        "website": {
          "shortUrl": "tpoagency.be",
          "url": "https://tpoagency.be/"
      }
    },
    {
        "websiteName": "raccoons",
        "website": {
          "shortUrl": "raccoons.be",
          "url": "https://www.raccoons.be/"
      }
    },
    {
        "websiteName": "twitter",
        "website": {
          "shortUrl": "twitter.com",
          "url": "https://twitter.com/"
      }
    },
    {
        "websiteName": "telenet",
        "website": {
          "shortUrl": "telenet.be/residential/nl",
          "url": "https://www2.telenet.be/residential/nl"
      }
    },
    {
        "websiteName": "netlix",
        "website": {
          "shortUrl": "netflix.com",
          "url": "https://www.netflix.com/"
      }
    },
    {
        "websiteName": "sudinfo",
        "website": {
          "shortUrl": "sudinfo.be",
          "url": "https://www.sudinfo.be/"
      }
    },
    {
        "websiteName": "rtbf",
        "website": {
          "shortUrl": "rtbf.be",
          "url": "https://www.rtbf.be/"
      }
    },
    {
        "websiteName": "bol",
        "website": {
          "shortUrl": "bol.com",
          "url": "https://www.bol.com/be/nl/"
      }
    },
    {
        "websiteName": "sporza",
        "website": {
          "shortUrl": "sporza.be",
          "url": "https://sporza.be/nl/"
      }
    },
    {
        "websiteName": "microsoft office",
        "website": {
          "shortUrl": "office.com",
          "url": "https://www.office.com/"
      }
    },
    {
        "websiteName": "linkedin",
        "website": {
          "shortUrl": "linkedin.com",
          "url": "https://www.linkedin.com/"
      }
    },
    {
        "websiteName": "2dehands",
        "website": {
          "shortUrl": "2dehands.be",
          "url": "https://www.2dehands.be/"
      }
    },
    {
        "websiteName": "belgium",
        "website": {
          "shortUrl": "belgium.be",
          "url": "https://www.belgium.be/nl"
      }
    },
    {
        "websiteName": "proximus",
        "website": {
          "shortUrl": "proximus.be",
          "url": "https://www.proximus.be"
      }
    },
    {
        "websiteName": "zalando",
        "website": {
          "shortUrl": "zalando.be",
          "url": "https://www.zalando.be/"
      }
    },
    {
        "websiteName": "messenger",
        "website": {
          "shortUrl": "messenger.com",
          "url": "https://www.messenger.com/"
      }
    },
    {
        "websiteName": "booking",
        "website": {
          "shortUrl": "booking.com",
          "url": "https://www.booking.com"
      }
    }
  ]
