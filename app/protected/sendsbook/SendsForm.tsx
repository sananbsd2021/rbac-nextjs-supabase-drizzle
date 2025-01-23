import React, { useState, useEffect } from "react";

interface SendFormProps {
  onSubmit: (
    numsend: string,
    date: string,
    fromsend: string,
    tosend: string,
    topic: string,
    plan: string,
    note: string
  ) => void;
}

const SendForm: React.FC<SendFormProps> = ({ onSubmit }) => {
  const [numsend, setNumsend] = useState("0001");
  const [date, setDate] = useState("");
  const [tosend, setTosend] = useState("");
  const [topic, setTopic] = useState("");
  const [plan, setPlan] = useState("");
  const [note, setNote] = useState("");

  const [currentNumber, setCurrentNumber] = useState(1); // Tracks the current increment

  const fromsend = "องค์การบริหารส่วนตำบลมะบ้า"; // Fixed value for fromsend

  // Generate numsend when the component mounts or a new form is submitted
  useEffect(() => {
    const generateNumsend = () => {
      const newNumber = currentNumber.toString().padStart(4, "0"); // Pads the number to 4 digits
      setNumsend(newNumber);
    };

    generateNumsend();
  }, [currentNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(numsend, date, fromsend, tosend, topic, plan, note);
    setDate("");
    setTosend("");
    setTopic("");
    setPlan("");
    setNote("");
    setCurrentNumber((prev) => prev + 1); // Increment the number for the next submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow-md">
      {/* Neusend Field */}
      <div>
        <label htmlFor="numsend" className="block text-sm font-medium text-gray-700">
          ที่หนังสือส่ง
        </label>
        <input
          type="text"
          id="numsend"
          value={numsend}
          placeholder="ที่หนังสือส่ง"
          className="border p-2 w-full rounded"
          readOnly // Make the field read-only
        />
      </div>

      {/* Date Field */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          วันที่
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Fromsend Field */}
      <div>
        <label htmlFor="fromsend" className="block text-sm font-medium text-gray-700">
          จาก
        </label>
        <input
          type="text"
          id="fromsend"
          value={fromsend}
          className="border p-2 w-full rounded"
          readOnly // Make the field read-only
        />
      </div>

      {/* Tosend Field */}
      <div>
        <label htmlFor="tosend" className="block text-sm font-medium text-gray-700">
          ถึง
        </label>
        <input
          type="text"
          id="tosend"
          value={tosend}
          onChange={(e) => setTosend(e.target.value)}
          placeholder="ถึง"
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Topic Field */}
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
          เรื่อง
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="เรื่อง"
          className="border p-2 w-full rounded"
          required
        />
      </div>

      {/* Plan Field */}
      <div>
        <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
          การปฏิบัติ
        </label>
        <textarea
          id="plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="การปฏิบัติ"
          className="border p-2 w-full rounded"
          rows={4}
          required
        ></textarea>
      </div>

      {/* Note Field */}
      <div>
        <label htmlFor="note" className="block text-sm font-medium text-gray-700">
          หมายเหตุ
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="หมายเหตุ"
          className="border p-2 w-full rounded"
          rows={4}
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        บันทึก
      </button>
    </form>
  );
};

export default SendForm;
