import requests
import pandas as pd
from bs4 import BeautifulSoup
import tkinter as tk
from tkinter import filedialog, messagebox
import ttkbootstrap as ttk  # Modern UI framework

def scrape_and_save():
    url = url_entry.get().strip()
    if not url:
        messagebox.showerror("Error", "Please enter a valid URL!")
        return
    
    # Get save file path
    file_path = filedialog.asksaveasfilename(
        defaultextension=".xlsx",
        filetypes=[["Excel Files", "*.xlsx"], ["All Files", "*.*"]]
    )
    
    if not file_path:
        return  # User canceled file save dialog
    
    try:
        # Headers to mimic a real browser
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }

        # Request the page
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        # Parse the HTML
        soup = BeautifulSoup(response.text, "html.parser")

        # Find the main table div
        table_div = soup.find("div", class_="table-responsive")
        if not table_div:
            messagebox.showerror("Error", "Table not found on the webpage!")
            return

        # Extract relevant data
        data = []
        for row in table_div.find_all("tr"):
            team_element = row.find("a", class_="wctlight_team_text")  # Only the first occurrence
            player_elements = row.find_all("a", class_="wctlight_player_text")
            location_element = row.find("p")  # Location is stored in paragraph tags
            
            if team_element and len(player_elements) >= 2 and location_element:
                team_name = team_element.get_text(strip=True)
                location_text = location_element.get_text(" ", strip=True).replace("\n", " ")
                location_parts = location_text.split(" ")
                
                if len(location_parts) >= 2:
                    city = location_parts[0]
                    province = " ".join(location_parts[1:])
                else:
                    city = location_text
                    province = ""

                player1 = player_elements[0].get_text(" ", strip=True)
                player2 = player_elements[1].get_text(" ", strip=True)
                
                # **NEW: Remove city & province words from team name**
                words_to_remove = city.split() + province.split()
                for word in words_to_remove:
                    team_name = team_name.replace(word, "").strip()

                # Check for duplicate before appending
                row_data = [team_name, city, province, player1, player2]
                if row_data not in data:
                    data.append(row_data)

        if not data:
            messagebox.showerror("Error", "No valid data found!")
            return

        # Convert to DataFrame
        df = pd.DataFrame(data, columns=["Team", "City", "Province", "Player 1", "Player 2"])

        # Save to Excel
        df.to_excel(file_path, index=False)

        messagebox.showinfo("Success", f"Data successfully saved to:\n{file_path}")

    except requests.exceptions.RequestException as e:
        messagebox.showerror("Error", f"Request failed: {e}")
    except Exception as e:
        messagebox.showerror("Error", f"An error occurred: {e}")

# GUI Setup
root = ttk.Window(themename="sandstone")  # Modern dark theme
root.title("Web Scraper")
root.geometry("400x250")

ttk.Label(root, text="Enter URL:", font=("Arial", 12)).pack(pady=5)
url_entry = ttk.Entry(root, width=50)
url_entry.pack(pady=5)

button_frame = ttk.Frame(root)
button_frame.pack(pady=10)

scrape_button = ttk.Button(button_frame, text="Scrape & Save", command=scrape_and_save, bootstyle="success")
scrape_button.pack(side=tk.LEFT, padx=5)

root.mainloop()
