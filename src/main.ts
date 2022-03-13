import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import { Telegraf } from 'telegraf';
import 'dotenv/config';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req: Request, res: Response) => {
  return res.status(200).send('Sucesso');
});

const token = process.env.BOT_TOKEN;
const chatID = process.env.CHAT_ID;
const bot = new Telegraf(token!);

app.post('/send', async (req: Request, res: Response) => {
  const { message }: { message: string } = req.body;
  try {
    const result = await bot.telegram.sendMessage(chatID!, message as string);
    return res
      .status(200)
      .send({ message: 'Mensagem enviada', data: result.text });
  } catch (error: any) {
    return res
      .status(error.response.error_code)
      .send({ message: error.response.description });
  }
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server is running... ', port));
