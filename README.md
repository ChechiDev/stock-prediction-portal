# Stock Prediction Portal

A full-stack web application for stock market price prediction using a Deep Learning LSTM model. Users can enter any stock ticker and get interactive charts along with model evaluation metrics.

## Demo

Enter a ticker symbol (e.g. `AAPL`, `TSLA`, `GOOG`) and the app will:

- Download 10 years of historical data via Yahoo Finance
- Generate closing price, 100-day MA, and 200-day MA charts
- Run predictions with the trained LSTM model
- Display original vs predicted price and evaluation metrics (MSE, RMSE, R²)

## Tech Stack

**Backend**
- Python 3.12+
- Django 5.2 + Django REST Framework
- SimpleJWT (authentication)
- Keras / TensorFlow (LSTM model inference)
- yfinance (stock data)
- scikit-learn (preprocessing & metrics)
- matplotlib (server-side chart generation)

**Frontend**
- React 19 + Vite
- React Router v7
- Axios (HTTP client)
- Bootstrap 5
- FontAwesome

**ML**
- LSTM neural network (2 stacked LSTM layers: 128 → 64 units)
- MinMaxScaler normalization
- Trained on 70% of data, evaluated on 30%
- R² ≈ 0.988 on AAPL test data

## Project Structure

```
stock-prediction-project/
├── backend-django/
│   ├── api/                        # Stock prediction endpoint
│   │   ├── views.py                # Core prediction logic
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── utils.py                # Plot save helper
│   ├── accounts/                   # User registration & auth
│   └── stock_prediction_main/      # Django project config
│       ├── settings.py
│       └── urls.py
├── frontend-react/
│   └── src/
│       ├── components/
│       │   ├── dashboard/
│       │   │   └── Dashboard.jsx   # Main prediction UI
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   └── Header.jsx / Footer.jsx
│       ├── AuthProvider.jsx         # JWT auth context
│       ├── PrivateRoute.jsx
│       └── axiosInstance.jsx        # Axios with token refresh
└── ml/
    ├── notebooks/
    │   ├── stock_prediction_using_LSTM.ipynb   # Training notebook
    │   └── stock_prediction_model.keras        # Trained model
    └── data/
        └── raw/
```

## ML Model Architecture

```
Input (100, 1)
  └── LSTM(128, return_sequences=True, activation='tanh')
  └── LSTM(64)
  └── Dense(25)
  └── Dense(1)

Total params: 117,619
Optimizer: Adam
Loss: Mean Squared Error
Epochs: 50
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/register/` | Register new user |
| POST | `/api/v1/token/` | Obtain JWT tokens |
| POST | `/api/v1/token/refresh/` | Refresh access token |
| GET | `/api/v1/protected-view/` | Auth check |
| POST | `/api/v1/predict/` | Run stock prediction |

### Predict endpoint

**Request:**
```json
{ "ticker": "AAPL" }
```

**Response:**
```json
{
  "status": "success",
  "plot_img": "/media/AAPL_plot.png",
  "plot_100_dma": "/media/AAPL_100_dma_plot.png",
  "plot_200_dma": "/media/AAPL_200_dma_plot.png",
  "plot_prediction": "/media/AAPL_final_prediction.png",
  "mse": 15.36,
  "rmse": 3.92,
  "r2": 0.9884
}
```

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- [uv](https://docs.astral.sh/uv/) (Python package manager)
- [pnpm](https://pnpm.io/) (Node package manager)

### 1. Clone the repo

```bash
git clone https://github.com/ChechiDev/stock-prediction-project.git
cd stock-prediction-project
```

### 2. Backend setup

```bash
# Install Python dependencies
uv sync

# Create environment file
cp backend-django/.env.example backend-django/.env
# Edit .env and set SECRET_KEY and DEBUG=True
```

`backend-django/.env`:
```
SECRET_KEY='your-secret-key-here'
DEBUG=True
```

```bash
# Run migrations
cd backend-django
uv run python manage.py migrate

# Start the server
uv run python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000`.

### 3. Frontend setup

```bash
cd frontend-react

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env
```

`frontend-react/.env`:
```
VITE_BACKEND_BASE_API=http://127.0.0.1:8000/api/v1
VITE_BACKEND_ROOT=http://127.0.0.1:8000
```

```bash
# Start the dev server
pnpm dev
```

The app will be available at `http://localhost:5173`.

### 4. Register and log in

1. Navigate to `/register` and create an account
2. Log in at `/login`
3. You will be redirected to the Dashboard
4. Enter a ticker (e.g. `TSLA`) and click **See Prediction**

## ML Notebook

The LSTM model was trained in `ml/notebooks/stock_prediction_using_LSTM.ipynb`.

To retrain the model:

```bash
uv sync --group dev
cd ml/notebooks
uv run jupyter notebook
```

After training, save the model as `stock_prediction_model.keras` inside `ml/notebooks/`. The Django backend loads it from that path automatically.

## License

MIT
