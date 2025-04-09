import requests
import pandas as pd
from bs4 import BeautifulSoup
import tkinter as tk
from tkinter import filedialog, messagebox
import ttkbootstrap as ttk  # Modern UI framework

# Simulated update check
LATEST_VERSION = "1.0.1"  # Change this when updating

def check_for_updates():
    """Simulated update check"""
    current_version = "1.0.0"  # Hardcoded app version
    if current_version != LATEST_VERSION:
        messagebox.showinfo("Update Available", f"A new version ({LATEST_VERSION}) is available.")
    else:
        messagebox.showinfo("Up to Date", "You have the latest version.")

def scrape_and_save():
    url = url_entry.get().strip()
    if not url:
        messagebox.showerror("Error", "Please enter a valid URL!")
        return
    
    # Get save file path
    file_path = filedialog.asksaveasfilename(
        defaultextension=".csv",
        filetypes=[("CSV Files", "*.csv"), ("All Files", "*.*")]
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

        # Find the table
        table = soup.find("table", class_="rwd-table")

        if not table:
            messagebox.showerror("Error", "Table not found on the webpage!")
            return

        # Extract headers
        header_row = table.find("tr")
        headers = [th.get_text(strip=True) for th in header_row.find_all("th")]

        # Ensure correct column headers
        if len(headers) > 5:
            headers = ["Rank", "Team", "Location", "YTD", "Total"]

        # Extract rows
        data = []
        for row in table.find_all("tr")[1:]:  # Skip header row
            cells = row.find_all("td")
            
            # Ensure the row has enough columns before extracting data
            if len(cells) >= 6:
                rank = cells[0].text.strip()
                team = cells[2].text.strip()
                location = cells[3].text.strip()
                ytd = cells[4].text.strip()
                total = cells[5].text.strip()

                data.append([rank, team, location, ytd, total])

        # Convert to DataFrame
        df = pd.DataFrame(data, columns=headers)

        # Save to CSV
        df.to_csv(file_path, index=False)

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
