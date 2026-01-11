import { GoogleGenAI, Content, Part } from "@google/genai";
import { SERVICES, PRICING_TIERS, COMPANY_NAME, COMPANY_PHONE, COMPANY_ADDRESS } from '../constants';

const SYSTEM_INSTRUCTION = `
Вы — "ТрудБот", дружелюбный ИИ-ассистент компании "${COMPANY_NAME}".
Ваша цель — помогать клиентам, отвечая на вопросы об услугах, ценах и вакансиях.

Наши контакты:
Телефон: ${COMPANY_PHONE}
Адрес: ${COMPANY_ADDRESS}

Наши услуги:
${JSON.stringify(SERVICES)}

Наш Прайс-лист:
${JSON.stringify(PRICING_TIERS)}

Важное примечание по ценам:
Стоимость варьируется в пределах 15% в зависимости от сложности работ и формы оплаты.

Правила:
1. Будьте вежливы, кратки и полезны. Отвечайте на русском языке.
2. Если спрашивают о цене, всегда подчеркивайте, что точная стоимость определяется на месте, но давайте оценку на основе прайс-листа. Не забудьте упомянуть про возможную вариацию цены (+/- 15%).
3. Если спрашивают о работе, направляйте их в раздел "Вакансии" или говорите, что мы ищем грузчиков и разнорабочих.
4. Если пользователь хочет заказать услугу, предложите позвонить по номеру ${COMPANY_PHONE} или оставить заявку в разделе "Контакты".
5. Не выдумывайте услуги, которых нет в списке. Мы занимаемся услугами грузчиков, разнорабочими, вывозом мусора и разгрузкой фур.
6. Старайтесь отвечать короче 100 слов, если не требуются подробности.
`;

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const streamChatResponse = async function* (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
) {
  const ai = getClient();
  
  // Convert internal history format to Gemini API format
  const formattedHistory: Content[] = history.map(msg => ({
    role: msg.role,
    parts: [{ text: msg.text } as Part],
  }));

  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
    history: formattedHistory
  });

  const result = await chat.sendMessageStream({ message: newMessage });

  for await (const chunk of result) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
};
