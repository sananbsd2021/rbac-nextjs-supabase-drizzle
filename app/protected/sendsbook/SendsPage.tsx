"use client";

import { useState, useEffect } from "react";
import SendForm from "./SendsForm";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const SendsPage = () => {
  const [sendForms, setSendForms] = useState<any[]>([]);
  const supabase = createClient();
  const router = useRouter();

  // Fetch all send forms
  const fetchSendForms = async () => {
    const { data, error } = await supabase
      .from("sendforms")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching send forms:", error.message);
    } else {
      setSendForms(data || []);
    }
  };

  useEffect(() => {
    fetchSendForms();
  }, []);

  // Handle submission of a new send form
  const handleSubmit = async (
    numsend: string,
    date: string,
    fromsend: string,
    tosend: string,
    topic: string,
    plan: string,
    note: string
  ) => {
    const { error } = await supabase
      .from("sendforms")
      .insert([{ numsend, date, fromsend, tosend, topic, plan, note }]);

    if (error) {
      console.error("Error creating send form:", error.message);
    } else {
      fetchSendForms();
      alert("Send form added successfully!");
      router.push("/protected/sendforms");
    }
  };

  // Handle delete action
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this send form?")) {
      const { error } = await supabase.from("sendforms").delete().eq("id", id);
      if (error) {
        console.error("Error deleting send form:", error.message);
      } else {
        fetchSendForms();
        alert("Send form deleted successfully!");
      }
    }
  };

  // Navigate back
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Send Forms</h1>

      <button
        type="button"
        onClick={handleBack}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Back
      </button>

      <SendForm onSubmit={handleSubmit} />

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">เลขทะเบียนส่ง</th>
              <th className="px-4 py-2 text-left font-semibold">วันที่</th>
              <th className="px-4 py-2 text-left font-semibold">จาก</th>
              <th className="px-4 py-2 text-left font-semibold">ถึง</th>
              <th className="px-4 py-2 text-left font-semibold">เรื่อง</th>
              <th className="px-4 py-2 text-left font-semibold">การปฏิบัติ</th>
              <th className="px-4 py-2 text-left font-semibold">หมายเหตุ</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {sendForms.map((form) => (
              <tr key={form.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{form.numsend}</td>
                <td className="px-4 py-2">{form.date}</td>
                <td className="px-4 py-2">{form.fromsend}</td>
                <td className="px-4 py-2">{form.tosend}</td>
                <td className="px-4 py-2">{form.topic}</td>
                <td className="px-4 py-2">{form.plan}</td>
                <td className="px-4 py-2">{form.note}</td>
                <td>
                  <button
                    onClick={() => handleDelete(form.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SendsPage;
