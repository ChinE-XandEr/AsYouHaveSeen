import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

app.use(express.json())

// 允许跨域请求
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'POST')
  next()
})

// 处理保存 projects 请求
app.post('/api/projects', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'src', 'assets', 'data', 'projects.json')

    // 验证请求数据
    if (!req.body || !req.body.projects) {
      res.status(400).json({ success: false, error: 'Invalid data format' })
      return
    }

    // 确保目录存在
    const dirPath = path.dirname(filePath)
    await fs.mkdir(dirPath, { recursive: true })

    // 写入文件
    const data = JSON.stringify(req.body, null, 2)
    await fs.writeFile(filePath, data, 'utf8')

    // 验证文件是否成功写入
    const written = await fs.readFile(filePath, 'utf8')
    if (written !== data) {
      res.status(500).json({ success: false, error: 'File verification failed' })
      return
    }

    console.log('Projects saved successfully:', filePath)
    res.json({ success: true, message: 'Projects saved successfully' })
  } catch (error) {
    console.error('Error saving projects:', error)
    res.status(500).json({ success: false, error: `Failed to save projects: ${error.message}` })
  }
})

// 处理保存 tools 请求
app.post('/api/tools', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'src', 'assets', 'data', 'tools.json')

    // 验证请求数据
    if (!req.body || !req.body.tools) {
      res.status(400).json({ success: false, error: 'Invalid data format' })
      return
    }

    // 确保目录存在
    const dirPath = path.dirname(filePath)
    await fs.mkdir(dirPath, { recursive: true })

    // 写入文件
    const data = JSON.stringify(req.body, null, 2)
    await fs.writeFile(filePath, data, 'utf8')

    // 验证文件是否成功写入
    const written = await fs.readFile(filePath, 'utf8')
    if (written !== data) {
      res.status(500).json({ success: false, error: 'File verification failed' })
      return
    }

    console.log('Tools saved successfully:', filePath)
    res.json({ success: true, message: 'Tools saved successfully' })
  } catch (error) {
    console.error('Error saving tools:', error)
    res.status(500).json({ success: false, error: `Failed to save tools: ${error.message}` })
  }
})

// 处理保存 settings 请求
app.post('/api/settings', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'src', 'assets', 'setting', 'setting.json')

    // 验证请求数据
    if (!req.body || !req.body.settings) {
      res.status(400).json({ success: false, error: 'Invalid data format' })
      return
    }

    // 确保目录存在
    const dirPath = path.dirname(filePath)
    await fs.mkdir(dirPath, { recursive: true })

    // 写入文件
    const data = JSON.stringify(req.body, null, 2)
    await fs.writeFile(filePath, data, 'utf8')

    // 验证文件是否成功写入
    const written = await fs.readFile(filePath, 'utf8')
    if (written !== data) {
      res.status(500).json({ success: false, error: 'File verification failed' })
      return
    }

    console.log('Settings saved successfully:', filePath)
    res.json({ success: true, message: 'Settings saved successfully' })
  } catch (error) {
    console.error('Error saving settings:', error)
    res.status(500).json({ success: false, error: `Failed to save settings: ${error.message}` })
  }
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
