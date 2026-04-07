from train_model import train_model, clean_text

try:
    model, vectorizer = train_model()
except Exception as e:
    print(f"Error inicializando modelo: {e}")
    from sklearn.naive_bayes import MultinomialNB
    from sklearn.feature_extraction.text import TfidfVectorizer
    model, vectorizer = MultinomialNB(), TfidfVectorizer()

def predict_category(description: str):
    cleaned = clean_text(description)
    X_test = vectorizer.transform([cleaned])

    prediction = model.predict(X_test)

    return prediction[0]

