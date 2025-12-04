export const askAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message)
      return res.status(400).json({ message: "Message required" });

    // RISPOSTA BASE (placeholder):
    const reply = "Consiglio: prova a pubblicare il video nelle prossime 2 ore, quando i tuoi follower sono più attivi.";

    res.json({ reply });

  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};
