Curling IO - How-to Guide



# Step-by-Step Guide

## Step 0: Install Required Libraries
You’ll need to install several Python libraries to run this program. These libraries include requests for making API requests, pandas for handling data, openpyxl for Excel file handling, ttkbootstrap for modern GUI components, and tkinter (which comes pre-installed with Python).

Run the following command to install the required libraries:

```
pip install requests pandas openpyxl ttkbootstrap
```


## 1. Launch the Program
To start using the program, simply run the Python script provided. If you have the required libraries installed, the graphical interface will open up. You’ll see the following options on the window:

- A dropdown list to select your province.
- A text box to enter the event ID.
- A button to fetch the data.

## 2. Select Your Province
The first thing you need to do is select the province from the dropdown list. The available options are:

- **on** (Ontario)
- **ns** (Nova Scotia)
- **qc** (Quebec)
- **bc** (British Columbia)
- **ab** (Alberta)
- **mb** (Manitoba)
- **sk** (Saskatchewan)
- **nl** (Newfoundland and Labrador)
- **pe** (Prince Edward Island)
- **yt** (Yukon)
- **nt** (Northwest Territories)
- **nu** (Nunavut)

Simply click on the dropdown list and choose the correct province short code.

## 3. Enter Event ID
Next, you’ll need to enter the event ID. This is a number that identifies the specific curling event. You can get this from the event's details (usually provided by the event organizers or the API that you’re using).

For example:  
This URL: [https://ns.curling.io/en/events/20247-2025-mixed-doubles/widget#/events/20247/draws](https://ns.curling.io/en/events/20247-2025-mixed-doubles/widget#/events/20247/draws)  
We are using the **Nova Scotia** curling event. This means the province is "ns". The event ID in this case is after the `/events/`. That makes the event ID **#20247**.

Type the event ID into the text box.


## 4. Fetch Data
Once you’ve selected the province and entered the event ID, click the **"Fetch Data"** button.

- The program will connect to the API using the province and event ID you’ve entered.
- It will then fetch the data for the teams participating in that event.

## 5. Save the Data to an Excel File
After the data is fetched, the program will display a dialog that lets you decide where to save the data. You can:

- Choose the location on your computer where you want to save the file.
- Name the file (the program suggests a default name with the `.xlsx` extension, but you can change it).

Once you’ve selected the location and file name, click **Save**.

- The program will save the data to an Excel file.
- A message will pop up confirming that the data has been successfully saved.

