import _Manager from './_Manager'

export default class LoadingManager extends _Manager {
  constructor (scene) {
    super(scene)
    this.style = {
      font: '20px roboto',
      fill: '#fafafa'
    }
    this.loadMessage = 'Chargement en cours...'
    this.loadMessageInfo = 'Chargement de : '
  }

  preload () {
    this.loadSceneInfos()
    this.createElements()
    this.addEvents()
  }

  loadSceneInfos () {
    this.progressBar = this.scene.add.graphics()
    this.progressBox = this.scene.add.graphics()

    this.width = this.scene.cameras.main.width
    this.height = this.scene.cameras.main.height
  }

  createElements () {
    this.progressBox.fillStyle(0x222222, 0.8)
    this.progressBox.fillRect(240, 270, 320, 50)

    this.loadingText = this.scene.make.text({
      x: this.width / 2,
      y: this.height / (2 - 50),
      text: this.loadMessage,
      style: this.style
    })
    this.loadingText.setOrigin(0.5, 0.5)

    this.percentText = this.scene.make.text({
      x: this.width / 2,
      y: (this.height / 2) - 5,
      text: '0%',
      style: this.style
    })
    this.percentText.setOrigin(0.5, 0.5)

    this.assetText = this.scene.make.text({
      x: this.width / 2,
      y: (this.height / 2) + 50,
      text: '',
      style: this.style
    })

    this.assetText.setOrigin(0.5, 0.5)
  }

  addEvents () {
    this.scene.load.on('progress', (value) => {
      this.percentText.setText(`${parseInt(value * 100, 10)}%`)
      this.progressBar.clear()
      this.progressBar.fillStyle(0xfafafa, 1)
      this.progressBar.fillRect(250, 280, 300 * value, 30)
    })

    this.scene.load.on('fileprogress', (file) => {
      this.assetText.setText(this.getLoadMessageInfo(file.key))
    })

    this.scene.load.on('complete', () => {
      this.destroy()
    })
  }

  getLoadMessageInfo (file) {
    return `${this.loadMessageInfo}${file}`
  }

  destroy () {
    this.progressBar.destroy()
    this.progressBox.destroy()
    this.loadingText.destroy()
    this.percentText.destroy()
    this.assetText.destroy()
  }
}
