let songs = [
    {
        titulo: "Sweet Child O' Mine",
        artista: "Guns N' Roses",
        src:"./songs/Guns N' Roses - Sweet Child O' Mine (Official Music Video).mp4",
        img:"./images/rock.jpg"
    },
    {
        titulo: "Je te laisserai des mots",
        artista: "Patrick Watson",
        src:"./songs/Je Te Laisserai Des Mots - Patrick Watson (Piano Cover).mp4",
        img:"./images/piano.jpg"
    },
    {
        titulo: "Faça dinheiro, se mantenha vivo",
        artista: "LEALL",
        src:"./songs/LEALL “Faça Dinheiro, Se Mantenha Vivo”.mp4",
        img:"./images/rap.jpg"
    }
]
const favorite = document.getElementById('favorite')
const remove = document.getElementById('remove')
let song = document.querySelector('audio')
let indexMusica = 0
let duracaoMusica = document.querySelector('.fim')
let imagem = document.querySelector('img')
let nomeDaMusica = document.querySelector('.descricao h2')
let nomeArtista = document.querySelector('.descricao small')
let volume = document.querySelector('.volume-main')
let volumeMuted = document.querySelector('.muted')
let volumeMedium = document.querySelector('.medium')
let volumeHigh = document.querySelector('.high')
let volumeTimer = null;

renderizarMusica(indexMusica)//chamando a função no começo para não carregar a primeira vez do site com os textos estáticos do html

//Eventos
favorite.addEventListener('click', () => {
    favorite.classList.toggle('favorite')
})

document.querySelector('.botao-play').addEventListener('click', playSong)

document.querySelector('.botao-pause').addEventListener('click', pauseSong)

song.addEventListener('timeupdate', atualizarBarra)

song.addEventListener('timeupdate', atualizarBarraVolume)


document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--
    if(indexMusica < 0){
        indexMusica = 2
    }
    renderizarMusica(indexMusica)
})

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++
    if(indexMusica > 2){
        indexMusica = 0
    }
    renderizarMusica(indexMusica)
})

//Funções
function renderizarMusica(index){
    song.setAttribute('src', songs[index].src)
    song.addEventListener('loadeddata', () => {
        let barra = document.getElementById('progress-song')
        nomeDaMusica.textContent = songs[index].titulo
        nomeArtista.textContent = songs[index].artista
        imagem.src = songs[index].img
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(song.duration))
        barra.style.width = '0%'
        playSong()
    })
    favorite.classList.remove('favorite')
}


function handleVolume(isTurnUp) {
    volume.style.display = 'block'
    
    clearTimeout(volumeTimer)

    if(isTurnUp){
        song.volume = song.volume + 0.1
    } else {
        song.volume = song.volume - 0.1
    }

    volumeTimer = setTimeout(function(){
        volume.style.display = 'none'
    }, 3000)
}

function playSong(){
    song.play()
    
    document.querySelector('.botao-pause').style.display = 'block'
    document.querySelector('.botao-play').style.display = 'none'

    document.onkeydown = function(event){
        const keyCode = event.code
        
        if(keyCode == 'Space'){
            pauseSong()
        }else if(keyCode == 'ArrowRight'){
            avancarTempo()
        }else if(keyCode == 'ArrowLeft'){
            diminuirTempo()
        }

        if (['ArrowDown', 'ArrowUp'].includes(keyCode)) {
            const isTurnUp = keyCode === 'ArrowUp'
    
            handleVolume(isTurnUp)
        }
    }


    setInterval(nextSong, 1)
}


function atualizarBarraVolume(){
    let barraVolume = document.getElementById('progress-volume')
    barraVolume.style.height = Math.floor(song.volume * 100) + '%'
    if(song.volume < 0.01){
        volumeMuted.style.display = 'block'
        volumeMedium.style.display = 'none'
        volumeHigh.style.display = 'none'
    }
    if(song.volume >= 0.01 && song.volume < 0.5){
        volumeMuted.style.display = 'none'
        volumeMedium.style.display = 'block'
        volumeHigh.style.display = 'none'
    }
    if(song.volume >= 0.5){
        volumeMedium.style.display = 'none'     
        volumeHigh.style.display = 'block'
        volumeMuted.style.display = 'none'     
    }
}

function nextSong(){
    if(song.currentTime == song.duration){
    indexMusica++
    if(indexMusica > 2){
        pauseSong()
    }
    renderizarMusica(indexMusica)
    }
}

function avancarTempo(){
    song.currentTime = song.currentTime + 5
}

function diminuirTempo(){
    song.currentTime = song.currentTime - 5
}
function pauseSong(){
    song.pause()
    document.querySelector('.botao-pause').style.display = 'none'
    document.querySelector('.botao-play').style.display = 'block'
    document.onkeydown = function(event){
        let keyCode = event.code
        if(keyCode == 'Space'){
            playSong()
        }else if(keyCode == 'ArrowRight'){
            avancarTempo()
        }else if(keyCode == 'ArrowLeft'){
            diminuirTempo()
        }
        
        if (['ArrowDown', 'ArrowUp'].includes(keyCode)) {
            const isTurnUp = keyCode === 'ArrowUp'
    
            handleVolume(isTurnUp)
        }
    }
}

function atualizarBarra(){
    let barra = document.getElementById('progress-song')
    barra.style.width = Math.floor((song.currentTime / song.duration) * 100) + '%'//concatenando com o sinal de porcentagem para o css aceitar
    //Math.Floor = arredonda o valor para baixo
    //currentTime = tempo atual de quanto está valendo a música divido por duration que é o valor total em segundos do áudio, vezes 100 para obter a porcentagem desse valor. Ver no console.log
    let tempoDecorrido = document.querySelector('.inicio')
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(song.currentTime))
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos/60)
    let campoSegundos = segundos % 60
    if(campoSegundos < 10){
        campoSegundos = '0' + campoSegundos
    }
    return campoMinutos + ':' + campoSegundos
}