<template>
    <section class="contain">
       <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Users List</h3>

                <div class="card-tools">
                    <button class="btn btn-success" @click="newModel" >Add New <i class="fas fa-user-plus"></i></button>
                </div>
              </div>
        <!-- /.card-header -->
        <div class="card-body table-responsive p-0">
        <table class="table table-hover">
            <tbody><tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Registered At</th>
            <th>Action</th>
            </tr>
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.type | upText }}</td>
                <td>{{ user.created_at | humanData }}</td>
                <td>
                    <a href="#" @click="editModel(user)">Edit
                    <i class="fas fa-edit"></i>
                    </a>
                    |
                    <a href="#" @click="deleteUser(user.id)" class="red-txt">Delete
                    <i class="fas fa-trash"></i>
                    </a>
                </td>
            </tr>
            
        </tbody></table>
        </div>
        <!-- /.card-body -->
        </div>
    <!-- /.card -->
    </div>
</div>
<!-- Modal -->
<div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title" v-show="!editMode" id="addNewLabel">Add New</h5>
                <h5 class="modal-title" v-show="editMode" id="addNewLabel">Update User's Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form @submit.prevent="editMode ?updateUser() :createUser()">
                <div class="modal-body">
                    <div class="form-group">
                        <label>Name</label>
                        <input v-model="form.name" type="text" id="email" name="name" placeholder="Enter Name .." class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                        <has-error :form="form" field="name"></has-error>
                    </div>
                    <div class="form-group">
                        <label>Email Address</label>
                        <input v-model="form.email" type="email" id="email" name="email" placeholder="Enter Email .." class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                        <has-error :form="form" field="email"></has-error>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input v-model="form.password" type="password" id="password" name="password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                        <has-error :form="form" field="password"></has-error>
                    </div>
                    <div class="form-group">
                        <label>User Role</label>
                        <select v-model="form.type" name="type" id="type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                            <option value="">Select User Role</option>
                            <option value="admin">admin</option>
                            <option value="user">standrad User</option>
                            <option value="author">Author</option>
                        </select>
                        <has-error :form="form" field="type"></has-error>
                    </div>
                    <div class="form-group">
                        <label>Bio</label>
                        <textarea v-model="form.bio" type="text" id="bio" name="bio" placeholder="Enter Bio (optional) .." class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }">
                        </textarea>
                        <has-error :form="form" field="bio"></has-error>
                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button v-show="!editMode" type="submit" class="btn btn-primary">Create</button>
                    <button v-show="editMode" type="submit" class="btn btn-success">Update</button>
                </div>

            </form>
        </div>
    </div>
</div>
</section>
</template>

<script>
    export default {
         data () {
            return {
                editMode: false,
                users: {},
                // Create a new form instance
                form: new Form({
                    id: '',
                    name: '',
                    email: '',
                    password: '',
                    type: '',
                    bio: '',
                    photo: ''
                })
            }
        },
        methods:{
            updateUser(){
                this.$Progress.start()
                this.form.put('api/user/'+this.form.id)
                .then(() => {
                    $('#addNew').modal('hide')
                    swal(
                        'Updated!',
                        'Information has been updated.',
                        'success'
                        )

                    this.$Progress.finish()
                    Fire.$emit('afterCreated')
                })
                .catch(() => {
                    this.$Progress.fail()
                })

            },
            newModel(){
                this.editMode = false
                this.form.reset()
                $('#addNew').modal('show')
            },
            editModel(user){
                this.editMode = true
                this.form.reset()
                $('#addNew').modal('show')
                this.form.fill(user)           
            },
            deleteUser(id){
                swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            this.form.delete('api/user/'+id).then(() => {
                                swal(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                                )
                                toast({
                                    type: 'success',
                                    title: 'User Deleted!!'
                                    })
                                Fire.$emit('afterCreated')
                            }).catch(() =>{
                                swal(
                                    'Failed!',
                                    'there some worng plz try again',
                                    'warning'
                                    )
                            })
                        }
                    })
            },
            loadUser(){
                axios.get('api/user').then(({ data }) => (this.users = data.data ))
            },
            createUser(){
                this.$Progress.start()
                this.form.post('api/user').then(() => {
                    Fire.$emit('afterCreated')
                    $('#addNew').modal('hide')
                    toast({
                        type: 'success',
                        title: 'User was created in successfully'
                        })
                    this.$Progress.finish()
                    
                }).catch(() => {
                    this.$Progress.fail()
                    toast({
                        type: 'error',
                        title: 'User was not created'
                        })
                })
                

            }
        },
        created() {
            this.loadUser()
            Fire.$on('afterCreated', () => this.loadUser() )
            // setInterval(() => this.loadUser(), 3000)
        }
    }
</script>
