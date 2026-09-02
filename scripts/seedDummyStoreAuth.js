import { supabaseAdmin } from "../database/supabase.js";

const DUMMY_PASSWORD = "dummy1234";

async function seedDummyStoreAuth() {
  console.log("Fetching dummy stores...");

  const { data: stores, error: storeError } = await supabaseAdmin
    .from("stores")
    .select("id, sname, email")
    .like("email", "test.%@example.com")
    .order("created_at", { ascending: true });

  if (storeError) {
    throw storeError;
  }

  console.log(`Found ${stores.length} dummy stores.`);

  if (stores.length !== 20) {
    throw new Error(
      `Expected 20 dummy stores, but found ${stores.length}.`
    );
  }

  for (const store of stores) {
    console.log(`${store.sname}`);
    console.log(`   ID: ${store.id}`);
    console.log(`   Email: ${store.email}`);

    const { data: userData, error: userError } =
      await supabaseAdmin.auth.admin.getUserById(store.id);

    if (userData?.user) {
      console.log("Auth user already exists. Skipping.");
      continue;
    }

    if (userError && userError.status !== 404) {
      console.error(`Failed to check Auth user: ${userError.message}`);
      continue;
    }

    const { data, error } =
      await supabaseAdmin.auth.admin.createUser({
        id: store.id,
        email: store.email,
        password: DUMMY_PASSWORD,
        email_confirm: true,
        user_metadata: {
          account_type: "store",
          username: store.sname,
        },
      });

    if (error) {
      console.error(`Failed to create Auth user: ${error.message}`);
      continue;
    }

    console.log(`Auth user created: ${data.user.id}`);
  }

  console.log("Dummy store Auth seeding finished.");
}

seedDummyStoreAuth().catch((error) => {
  console.error("Seed failed:");
  console.error(error);
  process.exit(1);
});