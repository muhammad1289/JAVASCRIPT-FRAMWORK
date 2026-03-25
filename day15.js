import { HfInference } from 'https://cdn.skypack.dev/@huggingface/inference';
const hf = new HfInference('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');

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A Japanese shrine during cherry blossom season with lanterns and misty mountains",
  "A cosmic beach with glowing sand and an aurora in the night sky",
  "A medieval marketplace with colorful tents and street performers",
  "A cyberpunk city with neon signs and flying cars at night",
  "A peaceful bamboo forest with a hidden ancient temple",
  "A giant turtle carrying a village on its back in the ocean",
];
    
    let selectedCount;
    const maincard = document.querySelector('.main');
    const imgcountSelect = document.querySelector('.imgcountSelect');
    const grid = document.querySelector('.image-grid');
    const promptbtn = document.querySelector('.voice-btn');
    const promptinp = document.querySelector('.promptinpt')
    const modelSelect = document.querySelector('.modelselect');
    const aspectratio = document.querySelector('.aspectratioSelect')
    const genbtn = document.querySelector('.gen-btn');
    const downloadbtn = document.querySelector('.download-btn');
    const errbox = document.querySelector('.error-box');
   
    //const API_KEY = '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';
    



    imgcountSelect.addEventListener('change', function(e){
       selectedCount = e.target.value; 

         grid.innerHTML = ''; // Clear existing cards
       for(let i=1; i<=selectedCount; i++){
       const card = document.createElement('div');
         card.classList.add('image-card');
         card.style.aspectRatio = aspectratio.value || '1/1';
         card.innerHTML = `
        <div class="skeleton"></div>
        <div class="skeleton-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <path d="M21 15l-5-5L5 21"/>
          </svg>
          <div class="skeleton-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
        <img src="" alt="Generated image" class="" id="img${i}"/>
        <div class="image-overlay" style="aspect-ratio: ${aspectratio.value || '1/1'};"></div>
          <button class="download-btn" onclick="downloadImage('img${i}', 'image-${i}.png')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </button>
          <button class="expand-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
            </svg>
          </button>
        
      </div>`

        grid.appendChild(card);

       }

    })

    promptbtn.addEventListener('click', () => {
        const randomprompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)]
        promptinp.value = randomprompt; // input feilds use value not innerHTML
    })

    let prompt;
    let model;
    let imgcont;
    let ratio;
    maincard.addEventListener('submit', (e) => {
        e.preventDefault();

       

        if(prompt && model && imgcont && ratio){
            generateImage(prompt, imgcont, ratio, model);
        }

        //console.log(prompt , imgcont , ratio , model);
        

        //alert(`Genrating ${selectedCount} images on your prompt ${prompt}`)
    })

    const getimgdimensions = (ratio , baseSize = 512) => {
        const [width , height] = ratio.split('/').map(Number);
        const scalefactor = baseSize / Math.sqrt(width * height);

        let calculatedWidth = Math.round(width * scalefactor); // *16 req of some models to avoid errors
        let calculatedHeight = Math.round(height * scalefactor);

        calculatedWidth = Math.floor(calculatedWidth / 16) * 16; // *16 req of some models to avoid errors
        calculatedHeight = Math.floor(calculatedHeight / 16) * 16;
        
        return {width : calculatedWidth, height: calculatedHeight};
    }

    async function generateImage(prompt, count, ratio, model) {
       const {width, height} = getimgdimensions(ratio);
      for(let i=1; i<=count; i++){
      
     

      const blob = await hf.textToImage({
         model: model,
         inputs: prompt,
       });
        console.log(blob);
        
        const imgURL = URL.createObjectURL(blob);

        const imgElement = document.getElementById(`img${i}`);
        imgElement.src = imgURL;

        imgElement.classList.add('loaded'); // Add class to trigger CSS transition

          downloadbtn.addEventListener('click', () => {
            downloadImage(`img${i}`, `generated-image-${i}.png`);
          });
     }
    }

     genbtn.addEventListener('click', (e) => {
            e.preventDefault();
          prompt = promptinp.value.trim();
        if(!prompt) return alert('Please enter a prompt!');
         model = modelSelect.value;
        if(!model) return alert('Please select a model!');
         imgcont = parseInt(selectedCount) || 1;
         ratio = aspectratio.value || '1/1';

         generateImage(prompt, imgcont, ratio, model)

     })
    

    // Placeholder download function — JS will replace this with real logic
    function downloadImage(imgId, filename) {
      const img = document.getElementById(imgId);
      if (!img.src || img.src === window.location.href) return;
      const a = document.createElement('a');
      a.href = img.src;
      a.download = filename;
      a.click();
    }

   