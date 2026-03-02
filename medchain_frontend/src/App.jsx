import { useState } from "react";
import { ethers } from "ethers";
import { QRCodeCanvas } from "qrcode.react";

const contractAddress = "0xbF144B079d290eaE62Ae97274D39DFa71E012Eb9";
const abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_drugName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_mfgDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expDate",
				"type": "string"
			}
		],
		"name": "createBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			}
		],
		"name": "recallBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferBatch",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "batches",
		"outputs": [
			{
				"internalType": "string",
				"name": "batchId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "drugName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "manufactureDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "expiryDate",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "recalled",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "regulator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_batchId",
				"type": "string"
			}
		],
		"name": "verifyBatch",
		"outputs": [
			{
				"internalType": "string",
				"name": "batchId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "drugName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "manufactureDate",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "expiryDate",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "recalled",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

function App() {
  const [txHash, setTxHash] = useState("");
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState("Manufacturer");
  const [contract, setContract] = useState(null);

  const [batchId, setBatchId] = useState("");
  const [drugName, setDrugName] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [transferId, setTransferId] = useState("");
  const [newOwner, setNewOwner] = useState("");

  const [verifyId, setVerifyId] = useState("");
  const [batchData, setBatchData] = useState(null);

  const [recallId, setRecallId] = useState("");
  const [loading, setLoading] = useState(false);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setAccount(accounts[0]);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const medchainContract = new ethers.Contract(
      contractAddress,
      abi,
      signer
    );

    setContract(medchainContract);
  }

  async function createBatch() {
  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  if (!batchId || !drugName || !mfgDate || !expDate) {
    alert("Fill all fields");
    return;
  }

  try {
    setLoading(true);   // START LOADING

    const tx = await contract.createBatch(
      batchId,
      drugName,
      mfgDate,
      expDate
    );
    setTxHash(tx.hash);
    await tx.wait();   // Wait for blockchain confirmation

    alert("Batch Created Successfully!");

    // Clear input fields after success
    setBatchId("");
    setDrugName("");
    setMfgDate("");
    setExpDate("");

  } catch (error) {
    console.error(error);
    alert("Error creating batch. Maybe batch already exists.");
  } finally {
    setLoading(false);  // STOP LOADING (always runs)
  }
}

  async function transferBatch() {
  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  if (!transferId || !newOwner) {
    alert("Fill all fields");
    return;
  }

  try {
    setLoading(true);

    const tx = await contract.transferBatch(transferId, newOwner);
    setTxHash(tx.hash);
    await tx.wait();

    alert("Ownership Transferred Successfully!");

    setTransferId("");
    setNewOwner("");

  } catch (error) {
    console.error(error);
    alert("Transfer Failed. Make sure you are the current owner.");
  } finally {
    setLoading(false);
  }
}

  async function recallBatch() {
  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  if (!recallId) {
    alert("Enter Batch ID");
    return;
  }

  try {
    setLoading(true);

    const tx = await contract.recallBatch(recallId);
    setTxHash(tx.hash);
    await tx.wait();

    alert("Batch Recalled Successfully!");

    setRecallId("");

  } catch (error) {
    console.error(error);
    alert("Recall Failed. Only regulator can recall.");
  } finally {
    setLoading(false);
  }
}

async function verifyBatch() {
  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  if (!verifyId) {
    alert("Enter Batch ID");
    return;
  }

  try {
    setLoading(true);

    const data = await contract.verifyBatch(verifyId);

    setBatchData({
      batchId: data[0],
      drugName: data[1],
      mfgDate: data[2],
      expDate: data[3],
      owner: data[4],
      recalled: data[5],
    });

  } catch (error) {
    console.error(error);
    alert("Batch Not Found");
  } finally {
    setLoading(false);
  }
}

  return (
    
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>MedChain Dashboard</h1>

      <button onClick={connectWallet}>
        {account ? "Wallet Connected" : "Connect Wallet"}
      </button>

      {account && <p>Connected Account: {account}</p>}

      <hr />

      <h3>Select Role</h3>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option>Manufacturer</option>
        <option>Distributor</option>
        <option>Pharmacy</option>
        <option>Regulator</option>
        <option>Consumer</option>
      </select>

      <p>Current Role: {role}</p>

      <hr />

      {role === "Manufacturer" && (
        <div>
          <h3>Create Batch</h3>

          <input
            placeholder="Batch ID"
            value={batchId}
            onChange={(e) => setBatchId(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Drug Name"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Manufacture Date"
            value={mfgDate}
            onChange={(e) => setMfgDate(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="Expiry Date"
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
          />
          <br /><br />

          <button onClick={createBatch} disabled={loading}>
            {loading ? "Creating..." : "Create Batch"}
          </button>
          {txHash && (
            <div>
              <p>Transaction Hash:</p>
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {txHash}
              </a>
            </div>
          )}      
          {batchId && (
            <div style={{ marginTop: "20px" }}>
              <h4>QR Code for Batch</h4>
              <QRCodeCanvas value={batchId} size={150} />
            </div>
          )}
        </div>
      )}
      
      {(role === "Manufacturer" || role === "Distributor" || role === "Pharmacy") && (
        <>
          <hr />
          <h3>Transfer Batch</h3>

          <input
            placeholder="Batch ID"
            value={transferId}
            onChange={(e) => setTransferId(e.target.value)}
          />
          <br /><br />

          <input
            placeholder="New Owner Address"
            value={newOwner}
            onChange={(e) => setNewOwner(e.target.value)}
          />
          <br /><br />

          <button onClick={transferBatch} disabled={loading}>
            {loading ? "Transferring..." : "Transfer Ownership"}
          </button>
          {txHash && (
            <div>
              <p>Transaction Hash:</p>
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {txHash}
              </a>
            </div>
          )}
        </>
      )}

      <hr />

      {role === "Regulator" && (
        <div>
          <h3>Recall Batch</h3>

          <input
            placeholder="Batch ID"
            value={recallId}
            onChange={(e) => setRecallId(e.target.value)}
          />
          <br /><br />

         <button onClick={recallBatch} disabled={loading}>
          {loading ? "Recalling..." : "Recall Batch"}
        </button>
        {txHash && (
          <div>
            <p>Transaction Hash:</p>
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {txHash}
            </a>
          </div>
        )}
        </div>
      )}

      {role === "Consumer" && (
  <>
    <hr />
    <h3>Verify Batch</h3>

    <input
      placeholder="Enter Batch ID"
      value={verifyId}
      onChange={(e) => setVerifyId(e.target.value)}
    />
    <br /><br />

    <button onClick={verifyBatch} disabled={loading}>
      {loading ? "Verifying..." : "Verify"}
    </button>

    {batchData && (
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          borderRadius: "8px",
          border: batchData.recalled
            ? "2px solid red"
            : "2px solid green",
        }}
      >
        <h3>
          {batchData.recalled
            ? "⚠️ This Batch Has Been Recalled"
            : "✅ This Batch Is Safe"}
        </h3>

        <p><strong>Batch ID:</strong> {batchData.batchId}</p>
        <p><strong>Drug Name:</strong> {batchData.drugName}</p>
        <p><strong>Manufacture Date:</strong> {batchData.mfgDate}</p>
        <p><strong>Expiry Date:</strong> {batchData.expDate}</p>
        <p><strong>Current Owner:</strong> {batchData.owner}</p>
        <p><strong>Recall Status:</strong> {batchData.recalled ? "Recalled" : "Not Recalled"}</p>
      </div>
    )}
  </>
)}
    </div>
  );
}

export default App;