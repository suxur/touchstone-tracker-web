<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Laravel\Cashier\Cashier;

class SubscriptionController extends Controller
{
    public function index()
    {
        $plans = Cache::rememberForever('plans', function () {
            $stripe = Cashier::stripe();
            $prices = $stripe->prices->all();
            $items = [
                'monthly' => [],
                'yearly'  => [],
            ];

            // now we need to add the existing prices for the products
            foreach ($prices->data as $price) {
                if ($price->active === false) continue;
                $key = $price->recurring->interval . 'ly';
                $items[$key]['id'] = $price->id;
                $items[$key]['price'] = $price->unit_amount / 100;
                $items[$key]['product_id'] = $price->product;
            }

            return $items;
        });

        return Inertia::render('Account/Show', [
            'intent' => auth()->user()->createSetupIntent(),
            'plans'  => $plans
        ]);
    }

    public function update(Request $request)
    {
        $request
            ->user()
            ->newSubscription('pro', $request->get('price_id'))
            ->create($request->get('payment_method_id'));

        return response()->json(true);
    }

    public function cancel()
    {
        return auth()->user()->subscription('pro')->cancel();
    }
}
