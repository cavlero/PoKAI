export type Monument = {
  id: string;
  name: string;
  description: string;
  importance: string;
  funFact: string;
  pastImageDescription: string;
  chatResponses: Record<string, string>;
};

export const MONUMENTS: Monument[] = [
  {
    id: "colosseum",
    name: "The Colosseum, Rome",
    description: "Built between 70-80 AD under emperors Vespasian and Titus, the Colosseum is an elliptical amphitheater in the center of Rome. It could hold between 50,000 to 80,000 spectators and was used for gladiatorial contests, animal hunts, executions, and public spectacles.",
    importance: "The Colosseum represents the pinnacle of Roman engineering and architecture. It influenced stadium design for centuries and remains the largest amphitheater ever built. Today it stands as one of the most visited monuments in the world and a symbol of Imperial Rome.",
    funFact: "The Colosseum had a retractable awning called the 'velarium' operated by 1,000 sailors from the Roman navy to shade spectators from the sun.",
    pastImageDescription: "Ancient Rome at its peak — the Colosseum gleaming white marble with all four stories intact, surrounded by bustling Roman citizens",
    chatResponses: {
      "What was the Colosseum used for?": "The Colosseum was primarily used for gladiatorial contests — fights between trained warriors called gladiators. But it also hosted animal hunts (venationes), mock naval battles, executions of criminals, and public spectacles. On its opening day, Emperor Titus ordered 100 days of games!",
      "How old is it?": "Construction began in 70 AD under Emperor Vespasian and was completed in 80 AD — making it nearly 2,000 years old! That's older than most countries. The opening games lasted 100 days and featured 9,000 wild animals.",
      "Tell me something surprising": "The Colosseum could be flooded with water for mock naval battles called 'naumachiae'! They would bring in ships and stage entire sea battles for the crowd. Imagine watching a naval war inside a stadium!",
      "default": "Fascinating question! As a guide who has walked these ancient stones, I can tell you that the Colosseum witnessed both the greatest triumphs and darkest moments of Roman civilization. The walls here have absorbed 2,000 years of history — what aspect would you like to explore deeper?"
    }
  },
  {
    id: "notredame",
    name: "Notre-Dame de Paris",
    description: "Notre-Dame de Paris is a medieval Catholic cathedral on the Île de la Cité in Paris, France. Construction began in 1163 under Bishop Maurice de Sully and was largely complete by 1345. It is considered one of the finest examples of French Gothic architecture.",
    importance: "Notre-Dame is not only France's most famous cathedral but a masterpiece of Gothic architecture that influenced churches across Europe. Its flying buttresses were an engineering innovation of their era. It suffered a devastating fire in April 2019 but underwent remarkable restoration.",
    funFact: "Notre-Dame's famous gargoyles were actually added in the 19th century during restoration by architect Eugène Viollet-le-Duc. The original medieval cathedral had far fewer decorative grotesques!",
    pastImageDescription: "13th Century Paris - A towering Notre Dame with pristine stained glass, vibrant colors on its facade, and bustling medieval markets below.",
    chatResponses: {
      "When was it built?": "Construction began in 1163 AD under Bishop Maurice de Sully. The main structure took about 100 years to complete, with additions continuing until 1345. That means some medieval workers spent their entire lives building this cathedral — and never saw it finished!",
      "What happened in 2019?": "On April 15, 2019, a devastating fire broke out during renovation work. The cathedral's wooden spire collapsed and the roof was largely destroyed. Miraculously, the towers, stone vaulting, and many priceless artworks survived. The restoration effort has been extraordinary!",
      "Tell me something surprising": "During the French Revolution, Notre-Dame was converted into a 'Temple of Reason' and later a warehouse! The original statues of Biblical kings were torn down because revolutionaries thought they were French kings. Only in the 19th century was it fully restored.",
      "default": "What a wonderful question for a student of history! Notre-Dame has witnessed coronations, revolutions, and centuries of Parisian life. Every stone here tells a story of faith, artistry, and resilience. The medieval builders who crafted these walls had no modern machinery — only faith and ingenuity."
    }
  },
  {
    id: "neuschwanstein",
    name: "Neuschwanstein Castle, Bavaria",
    description: "Neuschwanstein Castle is a 19th-century historicist palace near Füssen in southwest Bavaria, Germany. It was commissioned by King Ludwig II of Bavaria as a personal retreat and homage to the composer Richard Wagner. Construction began in 1869.",
    importance: "Neuschwanstein is one of the most photographed buildings in the world and served as the inspiration for Sleeping Beauty's Castle at Disneyland. It represents the Romantic era's idealization of medieval chivalry and is a masterpiece of Romanesque Revival architecture.",
    funFact: "King Ludwig II only lived in Neuschwanstein for 172 days before being declared mentally unfit and dying mysteriously in 1886. The castle was opened to tourists just weeks after his death — to pay off his debts!",
    pastImageDescription: "A pristine fairy tale castle perched on an alpine ridge in the 19th century, surrounded by dense Bavarian forests and dramatic snowy peaks.",
    chatResponses: {
      "Who built this castle?": "Neuschwanstein was built by King Ludwig II of Bavaria, often called 'Mad King Ludwig.' He was obsessed with medieval legends, especially the operas of Richard Wagner. He designed the castle as a fantasy retreat — basically a real-life fairy tale castle! Construction started in 1869.",
      "Is it really from the Middle Ages?": "Surprisingly, no! Despite looking like a medieval castle, Neuschwanstein was built in the 1800s — it's only about 150 years old. King Ludwig was deeply nostalgic for a romanticized version of the Middle Ages that never quite existed. It's history dressed up as history!",
      "Tell me something surprising": "Walt Disney was so inspired by Neuschwanstein that he used it as the model for Sleeping Beauty's Castle in Disneyland! So when you visit Disneyland, you're looking at a copy of a 19th-century building that was itself a fantasy version of medieval architecture. History within history!",
      "default": "What a captivating question about this dreamlike castle! King Ludwig II built Neuschwanstein to escape the pressures of modern life and political power. He wanted to live inside a fairy tale — and in many ways, he succeeded. Though his story ended tragically, his castle enchants millions every year."
    }
  }
];
