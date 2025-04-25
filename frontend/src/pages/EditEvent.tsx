import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../utils/supabaseClient";
import { Navbar } from "./Navbar";
import { Form, Input, Checkbox, Button } from "antd";

// Allergy options should match your Events table allergens enum or array values
const allergyOptions = [
  "Dairy-free",
  "Gluten-free",
  "Kosher",
  "Halal",
  "Vegetarian",
  "Vegan",
  "Nut-free",
];

interface EventData {
  name: string;
  spots_remaining: number;
  location: string;
  time_start: string;
  time_end: string;
  allergens: string[];
  description: string;
}

const EditEvent: React.FC = () => {
  const navigate = useNavigate();
  const { eventId } = useParams<{ eventId: string }>();
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!eventId) {
      navigate("/profile");
      return;
    }

    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from("Events")
          .select(
            "name, spots_remaining, location, time_start, time_end, allergens, description"
          )
          .eq("id", eventId)
          .single();

        if (error) throw error;

        // Populate form with existing values
        form.setFieldsValue({
          eventName: data.name,
          quantity: data.spots_remaining,
          location: data.location,
          startTime: data.time_start,
          endTime: data.time_end,
          allergy: data.allergens,
          foodDescription: data.description,
        });
      } catch (err) {
        console.error("Error fetching event:", err);
        alert("Failed to load event details.");
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, form, navigate]);

  const onFinish = async (values: any) => {
    const {
      eventName,
      quantity,
      location,
      startTime,
      endTime,
      allergy,
      foodDescription,
    } = values;

    try {
      const { error } = await supabase
        .from("Events")
        .update({
          name: eventName,
          spots_remaining: quantity,
          location,
          time_start: startTime,
          time_end: endTime,
          allergens: allergy,
          description: foodDescription,
        })
        .eq("id", eventId);

      if (error) {
        console.error("Error updating event:", error);
        alert("Error saving changes.");
      } else {
        alert("Event updated successfully!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    }
  };

  if (loading) return <div>Loading event...</div>;

  return (
    <div style={{ fontFamily: "Inter, sans-serif", padding: "2rem" }}>
      <Navbar isLoggedIn={true} />
      <main style={{ maxWidth: 700, margin: "2rem auto" }}>
        <h1
          style={{
            fontSize: "2rem",
            borderBottom: "1px solid #aaa",
            marginBottom: "2rem",
          }}
        >
          Edit My Event
        </h1>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Event Name"
            name="eventName"
            rules={[{ required: true, message: "Please input the event name" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Number of Spots"
            name="quantity"
            rules={[{ required: true, message: "Please input the number of spots" }]}
          >
            <Input type="number" size="large" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input the location" }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[{ required: true, message: "Please input the start time" }]}
          >
            <Input type="time" size="large" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please input the end time" }]}
          >
            <Input type="time" size="large" />
          </Form.Item>

          <Form.Item label="Allergies" name="allergy">
            <Checkbox.Group options={allergyOptions} />
          </Form.Item>

          <Form.Item
            label="Food Description"
            name="foodDescription"
            rules={[{ required: true, message: "Please input the description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50",
                marginRight: "1rem",
              }}
            >
              Save Changes
            </Button>
            <Button size="large" onClick={() => navigate("/profile")}>Cancel</Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
};

export default EditEvent;
