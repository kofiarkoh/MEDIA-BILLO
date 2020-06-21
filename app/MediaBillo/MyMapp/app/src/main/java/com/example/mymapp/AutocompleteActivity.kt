package com.example.mymapp


import android.R.attr.apiKey
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.common.api.Status
import com.google.android.libraries.places.api.Places
import com.google.android.libraries.places.api.model.Place
import com.google.android.libraries.places.widget.AutocompleteSupportFragment
import com.google.android.libraries.places.widget.listener.PlaceSelectionListener
import java.util.*


class AutocompleteActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        // Initialize the SDK
        // Initialize the SDK


        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_autocomplete)
        // Initialize the AutocompleteSupportFragment.
        // Initialize the AutocompleteSupportFragment.
        Places.initialize(applicationContext, "AIzaSyAmop4rdnKhBBkejIFS_AOs7SAesy1EZ3E")

// Create a new Places client instance
        // Create a new Places client instance
        val placesClient = Places.createClient(this)
        val autocompleteFragment =
            supportFragmentManager.findFragmentById(R.id.autocomplete_fragment) as AutocompleteSupportFragment?

// Specify the types of place data to return.
        // Specify the types of place data to return.
        autocompleteFragment!!.setPlaceFields(Arrays.asList(Place.Field.ID, Place.Field.NAME))

// Set up a PlaceSelectionListener to handle the response.
        // Set up a PlaceSelectionListener to handle the response.
        autocompleteFragment.setOnPlaceSelectedListener(object : PlaceSelectionListener {
            override fun onPlaceSelected(place: Place) {
                Log.i("autocomtag", "Place: " + place.name + ", " + place.id)
            }

            override fun onError(p0: Status) {
            //To change body of created functions use File | Settings | File Templates.
                Log.i("autocomtag", "An error occurred: $p0")
            }
          /*  fun onError(status: AsyncTask.Status) {
                Log.i("autocomtag", "An error occurred: $status")
            }*/


        })

    }

}
