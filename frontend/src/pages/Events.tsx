import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import EventCard from "../EventCard";
import { Divider } from "antd";
import Footer from "./Footer";
import { Checkbox } from "antd";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";
import useRedirectIfAuthenticated from "../hooks/useRedirectedIfAuthenticated";

function Events() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/sign-in"); // or wherever you want to send unauthenticated users
      } else {
        setLoading(false); // only allow rendering after auth is confirmed
      }
    };
    checkUser();
  }, [navigate]);
  const onFinish = async (values: any) => {
    console.log("Form values: ", values);
    const navigate = useNavigate();
    useRedirectIfAuthenticated("/profile");

    try {
      const { data, error } = await supabase.from("Events").insert([
        {
          name: values.eventName,
          location: values.location,
          spots_remaining: values.quantity,
          description: values.foodDescription,
          time_start: values.startTime,
          time_end: values.endTime,
          allergens: values.allergy,
        },
      ]);

      if (error) {
        console.error("Error, could not create event: ", error);
      } else {
        console.log("Event created: ", data);
        window.location.reload();

        // delete all the input after the events are created
      }
    } catch (err) {
      console.error("Unexpected error: ", err);
    }
  };

  const allergyOptions = [
    "Dairy-free",
    "Gluten-free",
    "Kosher",
    "Halal",
    "Vegetarian",
    "Vegan",
    "Nut-free",
  ];
  return (
    <div>
      <div style={{ marginTop: "200px" }}>
        <h1
          style={{
            fontFamily: "'Abhaya Libre', serif",
            fontWeight: 800,
            fontSize: "80px",
          }}
        >
          Create an Event!
        </h1>

        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: "600px", margin: "0 auto" }}
        >
          <Form.Item
            label="Event Name"
            name="eventName"
            rules={[
              { required: true, message: "Please input the event name!" },
            ]}
          >
            <Input size="large" placeholder="Event Name" />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <Input type="number" size="large" placeholder="Quantity" />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please input the location!" }]}
          >
            <Input size="large" placeholder="Location" />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[
              { required: true, message: "Please input the start time!" },
            ]}
          >
            <Input type="time" size="large" placeholder="Start Time" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please input the end time!" }]}
          >
            <Input type="time" size="large" placeholder="End Time" />
          </Form.Item>

          <Form.Item
            label="Allergy"
            name="allergy"
            rules={[
              { required: false, message: "Please select any allergies!" },
            ]}
          >
            <Checkbox.Group options={allergyOptions} />
          </Form.Item>

          <Form.Item
            label="Food Description"
            name="foodDescription"
            rules={[
              { required: true, message: "Please input the food description!" },
            ]}
          >
            <Input.TextArea
              size="large"
              placeholder="Food Description"
              rows={4}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ backgroundColor: "#E71F1F", borderColor: "#E71F1F" }}
            >
              Create Event
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Events;
