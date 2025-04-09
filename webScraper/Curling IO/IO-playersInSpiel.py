import requests
import pandas as pd
import logging
import tkinter as tk
from tkinter import ttk
import ttkbootstrap as ttkb
from tkinter import messagebox, filedialog

# Set up logging
logging.basicConfig(level=logging.ERROR, format='%(asctime)s - %(levelname)s - %(message)s')

def fetch_curling_teams(province, event):
    url = f"https://api-curlingio.global.ssl.fastly.net/en/clubs/{province}/events/{event}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if 'teams' in data:
            lineup_lengths = [len(team.get('lineup', [])) for team in data['teams']]
            max_players = max(lineup_lengths, default=0)

            teams_data = [
                [team.get('name', 'Unknown Team')] +
                [member.get('name', 'Unknown Player') for member in team.get('lineup', [])] +
                [''] * (max_players - len(team.get('lineup', [])))
                for team in data['teams']
            ]
            
            # Create column headers
            columns = ['Team'] + [f'Player {i+1}' for i in range(max_players)]
            
            # Create DataFrame
            df = pd.DataFrame(teams_data, columns=columns)
            return df
        else:
            logging.error("No teams found in the event.")
            return None
    
    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching data: {e}")
        return None

def on_submit():
    province_code = province_combobox.get()
    event_id = event_entry.get()

    if not event_id:
        messagebox.showerror("Error", "Please enter an event number.")
        return

    df = fetch_curling_teams(province_code, event_id)
    
    if df is not None:
        # Ask the user where to save the file and what to name it
        file_path = filedialog.asksaveasfilename(defaultextension=".xlsx", 
                                                 filetypes=[("Excel Files", "*.xlsx"), ("All Files", "*.*")],
                                                 title="Save As")
        
        if file_path:
            try:
                df.to_excel(file_path, index=False)
                messagebox.showinfo("Success", f"Data saved as {file_path}")
            except Exception as e:
                messagebox.showerror("Error", f"Failed to save the file: {e}")
        else:
            messagebox.showwarning("Warning", "File not saved. No path selected.")
    else:
        messagebox.showerror("Error", "No data found for the selected event.")

# Set up the main window with ttkbootstrap
root = ttkb.Window(themename="flatly")
root.title("Curling Team Fetcher")

# Create the province dropdown
province_label = ttk.Label(root, text="Select Province:")
province_label.pack(pady=10)

province_combobox = ttk.Combobox(root, values=["ab", "bc", "mb", "nl", "ns", "nt", "nu", "on", "pe", "qc", "sk", "yt"], state="readonly")
province_combobox.pack(pady=10)
province_combobox.set("on")  # Default selection

# Create the event number input
event_label = ttk.Label(root, text="Enter Event ID:")
event_label.pack(pady=10)

event_entry = ttk.Entry(root)
event_entry.pack(pady=10)

# Submit button
submit_button = ttk.Button(root, text="Fetch Data", command=on_submit)
submit_button.pack(pady=20)

# Run the GUI
root.mainloop()
