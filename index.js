const colorPickerEl = document.getElementById('color-picker')
const selectModeEl = document.getElementById('select-mode')
const getColorBtn = document.getElementById('color-btn')

getColorBtn.addEventListener('click', getColorScheme)

function getColorScheme(){
    const colorCode = colorPickerEl.value.slice(1)
    const selectedMode = selectModeEl.value
    
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorCode}&mode=${selectedMode}&count=5`)
        .then(res => {
            if(!res.ok){
               throw new Error(res.status)
            } 
            return res.json()
         })
        .then(data => renderColors(data)) 
        .catch(error => console.error(error))          
}

function renderColors(data){
    document.getElementById('color-container').innerHTML = ``
    
        for (let i=0; i < 5; i++){
            document.getElementById('color-container').innerHTML += 
            `<div id="color-${i}" class="color-column">
                ${data.colors[i].hex.value}
            </div>`
            
            document.getElementById(`color-${i}`).style.backgroundColor = data.colors[i].hex.value
        }
}

