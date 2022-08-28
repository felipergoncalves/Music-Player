let songs = [
    {
        titulo: "Sweet Child O' Mine",
        artista: "Guns N' Roses",
        src:"./musics/Guns N' Roses - Sweet Child O' Mine (Official Music Video).mp4",
        img:"./images/rock.jpg"
    },
    {
        titulo: "Je te laisserai des mots",
        artista: "Patrick Watson",
        src:"./musics/Je Te Laisserai Des Mots - Patrick Watson (Piano Cover).mp4",
        img:"./images/piano.jpg"
    },
    {
        titulo: "Faça dinheiro, se mantenha vivo",
        artista: "LEALL",
        src:"./musics/LEALL “Faça Dinheiro, Se Mantenha Vivo”.mp4",
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

//eventos
document.querySelector('.botao-play').addEventListener('click', playSong)

document.querySelector('.botao-pause').addEventListener('click', pauseSong)

//funções
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