import { Button, Form, Input } from "antd";
import React from "react";
import EventCard from "../EventCard";
import { Divider } from "antd";
import Footer from "./Footer";
function Events() {
  const onFinish = (values: any) => {
    console.log("Form values: ", values);
  };
  return (
    <div>
      <div style={{ marginTop: "250px" }}>
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
              { required: false, message: "Please input any allergies!" },
            ]}
          >
            <Input size="large" placeholder="Allergy" />
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
