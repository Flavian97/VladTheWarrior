const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')




let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const audio = new Audio("ring.wav");
      audio.play();
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are receiving a letter from your commander who wants to meet you and send you on a special mission in order to find the hidden treasure ',
    options: [
      {
        text: 'Accept',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Reject',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'The commander is explaining to you that this is a special mission in Moscow in Russia and the commander wants to provide troops to take with you only if you think its too difficult',
    options: [
      {
        text: 'Thanks, I take the troops',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'No, Thanks! I can do it!',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 6
      },
      {
        text: 'Too scare, I am going home',
        nextText: 9
      }
    ]
  },
  {
    id: 3,
    text: 'Now you are meeting Alexandra who is a spy and who have been able to listen to Russians conversations that led to finding a map that is containing specific instruction about the exact location of the treasure. Would you like the map?',
    options: [
      {
        text: 'Yes, Thnaks!',
        nextText: 4
      },
      {
        text: 'No, I can do it!',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'Finding the treasure but unfortunately, you need to fight the Russian guards ',
    options: [
      {
        text: 'Fithing the Russian guards',
        nextText: 5
      },
      {
        text: 'Escaping because you might die',
        nextText: 9
      }
    ]
  },
  {
    id: 5,
    text: 'Congratulation you have managed to find the hidden treasure and you won the battle! Well done! Thank to you Vlad is recognized by everyone as a hero!',
    options: [
      {
        text: 'Restart',
        nextText: 1
      }
    ]
  },
  {
    id: 6,
    text: 'Alexandra managed to listen to Russians conversion. Therefore, she was able to find a map that has the exact location of the hidden treasure.Would you like the map?',
    options: [
      {
        text: 'Yes, I take the map',
        nextText: 7
      },
      {
        text: 'No I doo not need a map I am following my instinct',
        nextText: 9
      }
    ]
  },
  {
    id: 7,
    text: 'You have got injured in the fight against Russian guards. However, Alexandra saved you. Would you like to let Alexandra call the troops ',
    options: [
      {
        text: 'Yes, Alexandra goo and call the troops!',
        nextText: 8
      },
      {
        text: 'No I do not want any troops, I am ready for the final fight',
        nextText: 9
      }
    ]
  },
  {
    id: 8,
    text: 'A very cruel battle because the Russian guards were ready for one more attack. Therefore, they have got support in order to defend the treasure. In the end Vlad managed to get enough evidence to get back the treasure for his country',
    options: [
      {
        text: 'Restart',
        nextText: 1
      }
    ]
  },
  {
    id: 9,
    text: 'Wrong option try again from the beggining. Game over! ha.. ha.. ha..!',
    options: [
      {
        text: 'Restart',
        nextText: 1
      }
    ]
  }
]

startGame()

document.addEventListener("keypress", function(e) {
  if (e.keyCode === 32) {
    toggleFullScreen();
  }
}, false);

//full screen function, press SPACEBAR for fullscreen
function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

