import { getUserAccounts, deleteAccountById } from "../services/accounts.service.js";

export const getAccounts = async (req, res) => {
  const userId = req.user.id;
  const accounts = await getUserAccounts(userId);
  res.json(accounts);
};

// NON USIAMO PIÙ createAccount — ora le connessioni passano da TikTok OAuth
export const addAccount = async (req, res) => {
  return res.status(400).json({ 
    message: "Direct account creation is not allowed. Use OAuth login instead." 
  });
};

export const deleteAccount = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  await deleteAccountById(userId, id);

  res.json({ message: "Account scollegato" });
};
