import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

function Events() {
  const navigate = useNavigate();

  const [_loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate("/sign-in");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [navigate]);
  const onFinish = async (values: any) => {
    console.log("Form values: ", values);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const email = user?.email;

      const { data, error } = await supabase.from("Events").insert([
        {
          name: values.eventName,
          location: values.location,
          spots_remaining: values.quantity,
          description: values.foodDescription,
          time_start: values.startTime,
          time_end: values.endTime,
          allergens: values.allergy,
          creator_email: email,
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
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.09)",
            padding: "24px",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
          }}
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
              style={{
                backgroundColor: "#E71F1F",
                borderColor: "#E71F1F",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
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
