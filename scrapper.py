from facebook_scraper import get_posts
import json
import logging

def scrap_facebook_page(page_id):
    try:
        posts = get_posts(page_id, pages=5, options={"allow_extra_requests": False, "posts_per_page": 5})
        data = [post for post in posts]
        if not data:
            logging.info("No data to save.")
        return data
    except Exception as e:
        logging.error("An error occurred: {}".format(e))
        return []

def save_data(data, file_name):
    if data:  # Only save if data is not empty
        with open(file_name, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
    else:
        logging.info("No data to save because the data list is empty.")

def main():
    logging.basicConfig(level=logging.INFO)
    page_id = 'colin.champdavoine'  # Example, replace with your target
    data = scrap_facebook_page(page_id)
    if data:
        save_data(data, 'data.json')

if __name__ == '__main__':
    main()
